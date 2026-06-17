import { ModuleInfoDto } from './module-info.dto';
export declare class MeResponseDto {
    id: string;
    username: string;
    phone?: string;
    roles: string[];
    permissions: string[];
    modules: ModuleInfoDto[];
}
