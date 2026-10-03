import { IsArray, IsBoolean, IsOptional, IsString } from "class-validator";

export class CreateSkillDto{
    @IsString()
    title: string;

    @IsString()
    description: string;

    @IsOptional()
    @IsArray()
    @IsString()
    tags: string[];

    @IsBoolean()
    isVisible = true;

    @IsOptional()
    @IsString()
    icon: string;
}