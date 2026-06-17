import { WardOrmEntity } from './ward.orm-entity';
export declare class LgaOrmEntity {
    id: string;
    name: string;
    code: string;
    region: string | null;
    description: string | null;
    displayOrder: number;
    isActive: boolean;
    wards: WardOrmEntity[];
    createdAt: Date;
    updatedAt: Date;
}
