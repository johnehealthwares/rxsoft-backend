export declare const databaseConfig: {
    type: "postgres" | "sqlite" | "sqljs";
    host: string;
    port: number;
    username: string;
    password: string;
    database: string;
    synchronize: boolean;
    dropSchema: boolean;
    logging: boolean;
};
export declare class AppModule {
}
