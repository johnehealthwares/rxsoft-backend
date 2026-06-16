export class ColumnNumericTransformer {
  to(data: number | null): number | null {
    return data;
  }
  from(data: string | null): number | null {
    if (data === null) return null;
    return parseFloat(data);
  }
}

export const DateOrNullTransformer = {
  to(value: Date | null): string | null {
    return value instanceof Date ? value.toISOString() : null;
  },
  from(value: string | null): Date | null {
    return value ? new Date(value) : null;
  },
};