import {
    IsString,
    IsOptional,
    IsArray,
    ValidateNested,
    IsEnum,
    isObject,
    IsNumber,
    IsObject,
    IsDate
} from "class-validator";
import {Type} from "class-transformer"
import {hhData, TopLevelCategory, TopPageAdvantage} from "../top-page.model";
import {prop} from "@typegoose/typegoose";

class TopPageAdvantageDto {
    @IsString()
    title: string;

    @IsString()
    description: string;
}


class hhDataDto {
    @IsNumber()
    count: number;

    @IsNumber()
    juniorSalary: number;

    @IsNumber()
    middleSalary: number;

    @IsNumber()
    seniorSalary: number;

    @IsDate()
    updatedAt: number;
}


export class CreateTopPageDto {
    @IsEnum(TopLevelCategory)
    firstCategory: TopLevelCategory;

    @IsString()
    secondCategory: string;

    @IsString()
    title: string;

    @IsString()
    category: string;

    @IsString()
    alias: string;

    @IsOptional()
    @ValidateNested()
    @Type(() => hhDataDto)
    hh?: hhDataDto;

    @IsArray()
    @ValidateNested()
    @Type(() => TopPageAdvantageDto)
    advantages: TopPageAdvantageDto[];


    @IsString()
    seoText: string;

    @IsString()
    tagsTitle: string;


    @IsArray()
    @IsString({each: true})
    tags: string[];


}