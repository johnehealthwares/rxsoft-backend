import { UpdateUserPosConfigDto } from '../../user-pos-config/dto/user-pos-config.dto';
export declare class UpdateUserDto {
    username?: string;
    password?: string;
    roleCodes?: string[];
    phone?: string;
    isActive?: boolean;
    posConfig?: UpdateUserPosConfigDto;
}
