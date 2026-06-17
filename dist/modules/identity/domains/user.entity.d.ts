export declare class User {
    readonly id: string;
    readonly organizationId: string;
    readonly username: string;
    passwordHash: string;
    readonly isActive: boolean;
    roleCodes: string[];
    readonly phone?: string | undefined;
    constructor(id: string, organizationId: string, username: string, passwordHash: string, isActive: boolean, roleCodes?: string[], phone?: string | undefined);
}
