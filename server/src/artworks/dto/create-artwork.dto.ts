import { IsString, IsEnum, IsArray, IsBoolean, IsOptional } from "class-validator";

enum Category{
    dessin = 'dessin',
    design = 'design',
    crochet = 'crochet'
}

export class CreateArtworkDto {
    @IsString()
    title: string; 

    @IsString()
    descprition: string;

    @IsString()
    imageUrl: string;

    @IsEnum(Category)
    category: Category;

    @IsOptional()
    @IsArray()
    @IsString({each: true})
    tags?: string[];

    @IsOptional()
    @IsBoolean()
    isFeatured? = false;
}