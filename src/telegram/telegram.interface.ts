import {ModuleMetadata} from "@nestjs/common";
import It = jest.It;

export interface ITelegramOptions {
    chatId:string;
    token:string;
}

export interface  ITelegramModuleAsyncOptions extends Pick<ModuleMetadata, 'imports'> {
    useFactory: (...args: any[])=> Promise<ITelegramOptions> | ITelegramOptions;
    inject?: any[];
}