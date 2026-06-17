export type Feature = {
    resource: string;
    label: string;
    actions: {
        name: string;
        label: string;
    }[];
};
export type ModulePermissions = {
    id: string;
    name: string;
    features: Feature[];
};
export declare const MODULE_PERMISSIONS: ModulePermissions[];
export declare function getAllPermissionCodes(): string[];
export declare function getPermissionCodesByModule(moduleId: string): string[];
