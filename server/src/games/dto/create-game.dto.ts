import { IsArray, IsOptional, IsString } from "class-validator";

export class CreateGameDto{
    @IsString()
    title: string

    @IsString()
    @IsOptional()
    description: string

    @IsString()
    @IsOptional()
    thumbnail: string

    @IsString()
    @IsOptional()
    gameUrl: string

    @IsArray()
    @IsOptional()
    images: string[]
}