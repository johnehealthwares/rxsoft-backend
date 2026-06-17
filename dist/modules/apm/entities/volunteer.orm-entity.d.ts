export declare class VolunteerOrmEntity {
    id: string;
    name: string;
    phone: string;
    email: string | null;
    lga: string | null;
    ward: string | null;
    pollingUnit: string | null;
    skills: string | null;
    interests: string | null;
    availability: string | null;
    onboarded: boolean;
    createdAt: Date;
    updatedAt: Date;
}
