import { IsString, IsEnum, IsArray, IsBoolean, IsOptional, isString } from "class-validator";

enum Category{
    dessin = 'illustration',
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
    @IsString()
    brand: string;

    @IsOptional()
    @IsArray()
    @IsString({each: true})
    tags?: string[];

    @IsOptional()
    @IsBoolean()
    isFeatured? = false;
}