import { UpdateUserPosConfigDto } from '../../user-pos-config/dto/user-pos-config.dto';
export declare class CreateUserDto {
    username: string;
    password: string;
    phone?: string;
    roleCodes?: string[];
    posConfig?: UpdateUserPosConfigDto;
}
