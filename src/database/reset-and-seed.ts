import 'reflect-metadata';
import { existsSync, promises as fs } from 'node:fs';
import { resolve } from 'node:path';
import { ConfigService } from '@nestjs/config';
import { Client } from 'pg';
import { DataSource } from 'typeorm';
import { runSeeds } from './seeds/run';

type SupportedDbType = 'postgres' | 'sqlite' | 'sqljs';

function getConfig(): {
  type: SupportedDbType;
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
} {
  const config = new ConfigService();
  return {
    type: config.get<SupportedDbType>('DB_TYPE', 'postgres'),
    host: config.get<string>('DB_HOST', 'localhost'),
    port: Number(config.get<string>('DB_PORT', '5432')),
    username: config.get<string>('DB_USER', 'postgres'),
    password: config.get<string>('DB_PASSWORD', 'postgres'),
    database: config.get<string>('DB_NAME', 'rxsoft'),
  };
}

async function runSqlFile(dataSource: DataSource, sqlFilePath: string): Promise<void> {
  const sql = await fs.readFile(sqlFilePath, 'utf8');
  await dataSource.query(sql);
}

async function resetPostgresDatabase(
  config: ReturnType<typeof getConfig>,
  sqlFilePath: string,
): Promise<void> {
  const adminClient = new Client({
    host: config.host,
    port: config.port,
    user: config.username,
    password: config.password,
    database: 'postgres',
  });

  await adminClient.connect();
  try {
    await adminClient.query(
      `SELECT pg_terminate_backend(pid)
       FROM pg_stat_activity
       WHERE datname = $1 AND pid <> pg_backend_pid()`,
      [config.database],
    );
    await adminClient.query(`DROP DATABASE IF EXISTS "${config.database}"`);
    await adminClient.query(`CREATE DATABASE "${config.database}"`);
  } finally {
    await adminClient.end();
  }

  const dataSource = new DataSource({
    type: 'postgres',
    host: config.host,
    port: config.port,
    username: config.username,
    password: config.password,
    database: config.database,
  });

  await dataSource.initialize();
  try {
    await runSqlFile(dataSource, sqlFilePath);
    await runSeeds(dataSource);
  } finally {
    await dataSource.destroy();
  }
}

async function resetSqliteDatabase(
  config: ReturnType<typeof getConfig>,
  sqlFilePath: string,
): Promise<void> {
  const dbPath = resolve(process.cwd(), config.database);
  if (existsSync(dbPath)) {
    await fs.unlink(dbPath);
  }

  const dataSource = new DataSource({
    type: 'sqlite',
    database: dbPath,
  });

  await dataSource.initialize();
  try {
    await runSqlFile(dataSource, sqlFilePath);
    await runSeeds(dataSource);
  } finally {
    await dataSource.destroy();
  }
}

async function main(): Promise<void> {
  const config = getConfig();
  const sqlFilePath = resolve(process.cwd(), 'schema_v2_pharmacy.sql');

  if (config.type === 'postgres') {
    await resetPostgresDatabase(config, sqlFilePath);
    return;
  }

  if (config.type === 'sqlite') {
    await resetSqliteDatabase(config, sqlFilePath);
    return;
  }

  throw new Error(`DB reset script does not support DB_TYPE=${config.type}`);
}

main().catch((error: unknown) => {
  console.error('Failed to reset and seed database:', error);
  process.exit(1);
});
