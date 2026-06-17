export declare class ListQueryDto {
    page: number;
    limit: number;
    search?: string;
    category?: string;
    status?: string;
    trainingStatus?: string;
    severity?: string;
    contactedVia?: string;
    turnedOut?: string;
    contacted?: string;
    lgaId?: string;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
}
export declare class RegisterVolunteerDto {
    name: string;
    phone: string;
    email?: string;
    lga?: string;
    ward?: string;
    pollingUnit?: string;
    skills?: string;
    interests?: string;
    availability?: string;
}
export declare class JoinMovementDto {
    name: string;
    phone: string;
    email?: string;
    lga?: string;
    ward?: string;
    interests?: string;
    skills?: string;
}
export declare class CreateContactDto {
    name: string;
    email: string;
    phone?: string;
    subject: string;
    message: string;
}
export declare class NewsletterSubscribeDto {
    email: string;
    phone?: string;
}
export declare class EventRegistrationDto {
    name: string;
    phone: string;
    email?: string;
    lga?: string;
    ward?: string;
}
export declare class CitizenFeedbackDto {
    name: string;
    phone?: string;
    email?: string;
    lga?: string;
    message: string;
    topic?: string;
}
export declare class IssueReportDto {
    name: string;
    phone?: string;
    email?: string;
    lga?: string;
    ward?: string;
    category?: string;
    description: string;
}
export declare class DonationDto {
    name: string;
    email?: string;
    phone?: string;
    amount: number;
    notes?: string;
}
