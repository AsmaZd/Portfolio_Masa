import { Type } from "class-transformer";
import { IsArray, IsDate, IsOptional, IsString, ValidateNested } from "class-validator";

export class JourneyItemDto{
    @IsString()
    @IsOptional()
    title: string

    @IsString()
    @IsOptional()
    description: string

    @IsString()
    @IsOptional()
    date: string
}

export class UpdateAboutDto{
    @IsString()
    @IsOptional()
    photo: string

    @IsString()
    @IsOptional()
    bio: string

    @IsArray()
    @ValidateNested()
    @Type(() => JourneyItemDto)
    @IsOptional()
    journey: JourneyItemDto[]

    @IsString()
    @IsOptional()
    cvUrl: string
    
};