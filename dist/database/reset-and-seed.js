"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const node_fs_1 = require("node:fs");
const node_path_1 = require("node:path");
const config_1 = require("@nestjs/config");
const pg_1 = require("pg");
const typeorm_1 = require("typeorm");
function getConfig() {
    const config = new config_1.ConfigService();
    return {
        type: config.get('DB_TYPE', 'postgres'),
        host: config.get('DB_HOST', 'localhost'),
        port: Number(config.get('DB_PORT', '5432')),
        username: config.get('DB_USER', 'postgres'),
        password: config.get('DB_PASSWORD', 'postgres'),
        database: config.get('DB_NAME', 'rxsoft'),
    };
}
async function runSqlFile(dataSource, sqlFilePath) {
    const sql = await node_fs_1.promises.readFile(sqlFilePath, 'utf8');
    await dataSource.query(sql);
}
async function resetPostgresDatabase(config, sqlFilePath) {
    const adminClient = new pg_1.Client({
        host: config.host,
        port: config.port,
        user: config.username,
        password: config.password,
        database: 'postgres',
    });
    await adminClient.connect();
    try {
        await adminClient.query(`SELECT pg_terminate_backend(pid)
       FROM pg_stat_activity
       WHERE datname = $1 AND pid <> pg_backend_pid()`, [config.database]);
        await adminClient.query(`DROP DATABASE IF EXISTS "${config.database}"`);
        await adminClient.query(`CREATE DATABASE "${config.database}"`);
    }
    finally {
        await adminClient.end();
    }
    const dataSource = new typeorm_1.DataSource({
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
    }
    finally {
        await dataSource.destroy();
    }
}
async function resetSqliteDatabase(config, sqlFilePath) {
    const dbPath = (0, node_path_1.resolve)(process.cwd(), config.database);
    if ((0, node_fs_1.existsSync)(dbPath)) {
        await node_fs_1.promises.unlink(dbPath);
    }
    const dataSource = new typeorm_1.DataSource({
        type: 'sqlite',
        database: dbPath,
    });
    await dataSource.initialize();
    try {
        await runSqlFile(dataSource, sqlFilePath);
    }
    finally {
        await dataSource.destroy();
    }
}
async function main() {
    const config = getConfig();
    const sqlFilePath = (0, node_path_1.resolve)(process.cwd(), 'schema_v2_pharmacy.sql');
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
main().catch((error) => {
    console.error('Failed to reset and seed database:', error);
    process.exit(1);
});
//# sourceMappingURL=reset-and-seed.js.map