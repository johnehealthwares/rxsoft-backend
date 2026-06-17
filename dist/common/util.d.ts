import { Provider, Type } from '@nestjs/common';
export declare function createRepositorySwitchProviders<TInterface = unknown, TTypeorm extends TInterface = TInterface, TInMemory extends TInterface = TInterface>(mappings: Array<{
    token: symbol | string;
    typeormRepo: Type<TTypeorm>;
    inMemoryRepo: Type<TInMemory>;
    configKey?: string;
}>): Provider[];
