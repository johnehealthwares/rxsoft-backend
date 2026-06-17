export declare class CreateCandidateTourDto {
    title: string;
    lgaId: string;
    wardId?: string;
    visitType?: string;
    tourDate?: string;
    description?: string;
    expectedAttendees?: number;
    notes?: string;
}
export declare class UpdateCandidateTourDto {
    title?: string;
    visitType?: string;
    tourDate?: string;
    description?: string;
    actualAttendees?: number;
    stakeholdersMet?: string;
    commitments?: string;
    complaints?: string;
    volunteerSignups?: number;
    mediaCoverage?: string;
    notes?: string;
    status?: string;
}
export declare class CreateContentAssetDto {
    title: string;
    type: string;
    assetUrl: string;
    lgaId?: string;
    targetAudience?: string;
    messageKey?: string;
    language?: string;
    tags?: string;
}
export declare class CreateListeningMentionDto {
    platform: string;
    title: string;
    mentionUrl?: string;
    content?: string;
    sentiment?: string;
    reach?: number;
    mentionedAt?: string;
    source?: string;
    category?: string;
    isUrgent?: boolean;
}
export declare class CreateRapidResponseDto {
    mentionId: string;
    responseType?: string;
    content: string;
    publishedBy?: string;
    platform?: string;
}
