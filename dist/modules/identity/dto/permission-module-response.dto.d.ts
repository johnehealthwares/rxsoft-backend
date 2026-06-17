declare class ActionDto {
    name: string;
    label: string;
}
declare class FeatureDto {
    resource: string;
    label: string;
    actions: ActionDto[];
}
export declare class PermissionModuleResponseDto {
    id: string;
    name: string;
    features: FeatureDto[];
}
export {};
