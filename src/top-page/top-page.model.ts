import {Base, TimeStamps} from '@typegoose/typegoose/lib/defaultClasses';
import {prop, index} from '@typegoose/typegoose';

export enum TopLevelCategory {
    Courses,
    Services,
    Books,
    Products,
}

export class hhData {
    @prop()
    count: number;

    @prop()
    juniorSalary: number;

    @prop()
    middleSalary: number;

    @prop()
    seniorSalary: number;

    @prop()
    updatedAt: Date;
}

export class TopPageAdvantage {
    @prop()
    title: string;

    @prop()
    description: string;
}

export interface TopPageModel extends Base {
}

@index({'$**':'text'})
export class TopPageModel extends TimeStamps {
    @prop({enum: TopLevelCategory, type: () => Number})
    firstCategory: TopLevelCategory;

    @prop()
    secondCategory: string;

    @prop(
    )
    title: string;

    @prop()
    category: string;

    @prop({unique: true})
    alias: string;

    @prop()
    hh?: hhData;

    @prop({type: () => [TopPageAdvantage], _id: false})
    advantages: TopPageAdvantage[];

    @prop()
    seoText: string;

    @prop()
    tagsTitle: string;

    @prop({type: () => [String], _id: false})
    tags: string[];
}
