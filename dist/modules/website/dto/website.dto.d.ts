export declare class ListQueryDto {
    page: number;
    limit: number;
    search?: string;
    category?: string;
    prescription?: string;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
}
export declare class CreatePrescriptionDto {
    name?: string;
    phone?: string;
    email?: string;
    notes?: string;
}
export declare class CreateConsultationDto {
    name: string;
    phone: string;
    email?: string;
    symptoms?: string;
    questions?: string;
    channel?: 'WhatsApp' | 'Phone' | 'Video Call';
}
export declare class AddToCartDto {
    productId: string;
    quantity: number;
}
export declare class CreateOrderItemDto {
    itemId: string;
    quantity: number;
    unitPrice?: number;
}
export declare class CreateOrderDto {
    customerId?: string;
    deliveryAddress: string;
    city?: string;
    state?: string;
    phone?: string;
    shippingMethod?: string;
    paymentMethod: string;
    prescriptionIds?: string[];
    notes?: string;
    items: CreateOrderItemDto[];
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
export declare class CreateReviewDto {
    productId: string;
    rating: number;
    comment?: string;
    imageUrls?: string[];
}
export declare class SearchQueryDto {
    q: string;
    type?: 'medicines' | 'categories' | 'articles' | 'health_concerns';
}
export declare class RegisterDto {
    username: string;
    email?: string;
    phone?: string;
    password: string;
}
export declare class CreateHealthConcernDto {
    name: string;
    slug: string;
    description?: string;
    content?: string;
    iconName?: string;
    imageUrl?: string;
    displayOrder?: number;
    metaTitle?: string;
    metaDescription?: string;
}
export declare class UpdateHealthConcernDto {
    name?: string;
    slug?: string;
    description?: string;
    content?: string;
    iconName?: string;
    imageUrl?: string;
    displayOrder?: number;
    metaTitle?: string;
    metaDescription?: string;
}
export declare class CreateArticleDto {
    title: string;
    slug: string;
    excerpt?: string;
    content: string;
    category?: string;
    authorName?: string;
    imageUrl?: string;
    readingTime?: number;
    isPublished?: boolean;
    metaTitle?: string;
    metaDescription?: string;
}
export declare class UpdateArticleDto {
    title?: string;
    slug?: string;
    excerpt?: string;
    content?: string;
    category?: string;
    authorName?: string;
    imageUrl?: string;
    readingTime?: number;
    isPublished?: boolean;
    metaTitle?: string;
    metaDescription?: string;
}
export declare class UpdatePrescriptionStatusDto {
    status: string;
}
