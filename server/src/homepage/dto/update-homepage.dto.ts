import { IsArray, IsOptional, IsString } from "class-validator";

export class UpdateHomepageDto{
    @IsString()
    @IsOptional()
    heroTitle: string  
    
    @IsString()
    @IsOptional()
    heroSubtitle: string

    @IsString()
    @IsOptional()
    heroImage: string

    @IsArray()
    @IsOptional()
    featuredArtwork: string[]

    @IsArray()
    @IsOptional()
    socials: string[]
}