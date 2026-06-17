export type RequestUser = {
    sub: string;
    organizationId: string;
    username: string;
    roles: string[];
    permissions: string[];
};
export declare const CurrentUser: (...dataOrPipes: unknown[]) => ParameterDecorator;
