"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RedisRespClient = void 0;
const node_net_1 = require("node:net");
function encodeCommand(parts) {
    const header = `*${parts.length}\r\n`;
    const body = parts.map((part) => `$${Buffer.byteLength(part)}\r\n${part}\r\n`).join('');
    return header + body;
}
function parseResp(buffer, start = 0) {
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
        const values = [];
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
function isRespError(value) {
    return typeof value === 'object' && value !== null && 'error' in value;
}
class RedisRespClient {
    timeoutMs;
    host;
    port;
    password;
    dbIndex;
    constructor(redisUrl, timeoutMs = 300) {
        this.timeoutMs = timeoutMs;
        const parsedUrl = new URL(redisUrl);
        this.host = parsedUrl.hostname;
        this.port = Number(parsedUrl.port || 6379);
        this.password = parsedUrl.password || null;
        const pathname = parsedUrl.pathname.replace('/', '');
        this.dbIndex = pathname ? Number(pathname) : null;
    }
    async get(key) {
        const response = await this.command(['GET', key]);
        return typeof response === 'string' ? response : null;
    }
    async setEx(key, value, ttlSeconds) {
        const response = await this.command(['SET', key, value, 'EX', String(ttlSeconds)]);
        if (response !== 'OK') {
            throw new Error('Redis SET failed');
        }
    }
    async del(keys) {
        if (!keys.length) {
            return;
        }
        await this.command(['DEL', ...keys]);
    }
    async keys(pattern) {
        const response = await this.command(['KEYS', pattern]);
        if (!Array.isArray(response)) {
            return [];
        }
        return response.filter((item) => typeof item === 'string');
    }
    async command(cmd) {
        const commands = [];
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
    send(commands) {
        return new Promise((resolve, reject) => {
            const socket = new node_net_1.Socket();
            const expectedResponses = commands.length;
            const responses = [];
            let buffer = Buffer.alloc(0);
            const closeWithError = (error) => {
                socket.destroy();
                reject(error);
            };
            socket.setTimeout(this.timeoutMs);
            socket.once('timeout', () => closeWithError(new Error('Redis command timed out')));
            socket.once('error', (error) => closeWithError(error));
            socket.on('data', (chunk) => {
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
exports.RedisRespClient = RedisRespClient;
//# sourceMappingURL=redis-resp.client.js.map