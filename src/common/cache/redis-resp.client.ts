import { Socket } from 'node:net';

type RespValue = string | number | null | RespValue[] | { error: string };

type ParsedResp = {
  value: RespValue;
  nextIndex: number;
};

function encodeCommand(parts: string[]): string {
  const header = `*${parts.length}\r\n`;
  const body = parts.map((part) => `$${Buffer.byteLength(part)}\r\n${part}\r\n`).join('');
  return header + body;
}

function parseResp(buffer: Buffer, start = 0): ParsedResp | null {
  if (start >= buffer.length) {
    return null;
  }

  const prefix = String.fromCharCode(buffer[start] ?? 0);
  const lineEnd = buffer.indexOf('\r\n', start);
  if (lineEnd < 0) {
    return null;
  }
  const line = buffer.subarray(start + 1, lineEnd).toString('utf8');

  if (prefix === '+') {
    return { value: line, nextIndex: lineEnd + 2 };
  }

  if (prefix === '-') {
    return { value: { error: line }, nextIndex: lineEnd + 2 };
  }

  if (prefix === ':') {
    return { value: Number(line), nextIndex: lineEnd + 2 };
  }

  if (prefix === '$') {
    const byteLength = Number(line);
    if (byteLength === -1) {
      return { value: null, nextIndex: lineEnd + 2 };
    }

    const valueStart = lineEnd + 2;
    const valueEnd = valueStart + byteLength;
    if (valueEnd + 2 > buffer.length) {
      return null;
    }

    const value = buffer.subarray(valueStart, valueEnd).toString('utf8');
    return { value, nextIndex: valueEnd + 2 };
  }

  if (prefix === '*') {
    const itemCount = Number(line);
    if (itemCount === -1) {
      return { value: null, nextIndex: lineEnd + 2 };
    }

    let index = lineEnd + 2;
    const values: RespValue[] = [];
    for (let i = 0; i < itemCount; i += 1) {
      const parsed = parseResp(buffer, index);
      if (!parsed) {
        return null;
      }
      values.push(parsed.value);
      index = parsed.nextIndex;
    }

    return { value: values, nextIndex: index };
  }

  throw new Error(`Unsupported RESP prefix "${prefix}"`);
}

function isRespError(value: RespValue): value is { error: string } {
  return typeof value === 'object' && value !== null && 'error' in value;
}

export class RedisRespClient {
  private readonly host: string;
  private readonly port: number;
  private readonly password: string | null;
  private readonly dbIndex: number | null;

  constructor(
    redisUrl: string,
    private readonly timeoutMs = 300,
  ) {
    const parsedUrl = new URL(redisUrl);
    this.host = parsedUrl.hostname;
    this.port = Number(parsedUrl.port || 6379);
    this.password = parsedUrl.password || null;

    const pathname = parsedUrl.pathname.replace('/', '');
    this.dbIndex = pathname ? Number(pathname) : null;
  }

  async get(key: string): Promise<string | null> {
    const response = await this.command(['GET', key]);
    return typeof response === 'string' ? response : null;
  }

  async setEx(key: string, value: string, ttlSeconds: number): Promise<void> {
    const response = await this.command(['SET', key, value, 'EX', String(ttlSeconds)]);
    if (response !== 'OK') {
      throw new Error('Redis SET failed');
    }
  }

  async del(keys: string[]): Promise<void> {
    if (!keys.length) {
      return;
    }
    await this.command(['DEL', ...keys]);
  }

  async keys(pattern: string): Promise<string[]> {
    const response = await this.command(['KEYS', pattern]);
    if (!Array.isArray(response)) {
      return [];
    }

    return response.filter((item): item is string => typeof item === 'string');
  }

  private async command(cmd: string[]): Promise<RespValue> {
    const commands: string[][] = [];
    if (this.password) {
      commands.push(['AUTH', this.password]);
    }
    if (typeof this.dbIndex === 'number' && Number.isFinite(this.dbIndex)) {
      commands.push(['SELECT', String(this.dbIndex)]);
    }
    commands.push(cmd);

    const rawResponses = await this.send(commands);
    const finalResponse = rawResponses[rawResponses.length - 1];
    if (isRespError(finalResponse)) {
      throw new Error(finalResponse.error);
    }

    return finalResponse;
  }

  private send(commands: string[][]): Promise<RespValue[]> {
    return new Promise<RespValue[]>((resolve, reject) => {
      const socket = new Socket();
      const expectedResponses = commands.length;
      const responses: RespValue[] = [];
      let buffer = Buffer.alloc(0);

      const closeWithError = (error: unknown) => {
        socket.destroy();
        reject(error);
      };

      socket.setTimeout(this.timeoutMs);
      socket.once('timeout', () => closeWithError(new Error('Redis command timed out')));
      socket.once('error', (error) => closeWithError(error));

      socket.on('data', (chunk: Buffer) => {
        buffer = Buffer.concat([buffer, chunk]);
        while (responses.length < expectedResponses) {
          const parsed = parseResp(buffer, 0);
          if (!parsed) {
            break;
          }

          responses.push(parsed.value);
          buffer = buffer.subarray(parsed.nextIndex);
        }

        if (responses.length === expectedResponses) {
          socket.end();
          resolve(responses);
        }
      });

      socket.connect(this.port, this.host, () => {
        const payload = commands.map((parts) => encodeCommand(parts)).join('');
        socket.write(payload);
      });
    });
  }
}

