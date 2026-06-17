export declare class ColumnNumericTransformer {
    to(data: number | null): number | null;
    from(data: string | null): number | null;
}
export declare const DateOrNullTransformer: {
    to(value: Date | null): string | null;
    from(value: string | null): Date | null;
};
