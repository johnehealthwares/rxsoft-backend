export declare class EventOrmEntity {
    id: string;
    title: string;
    description: string | null;
    location: string | null;
    eventDate: Date | null;
    eventTime: string | null;
    category: string | null;
    imageUrl: string | null;
    maxAttendees: number | null;
    isPublished: boolean;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
}
