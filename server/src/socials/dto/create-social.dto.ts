import { IsString, IsUrl } from "class-validator";

export class CreateSocialDto{

    @IsString()
    plateform: string;

    @IsString()
    logo: string

    @IsString()
    pseudo: string

    @IsUrl()
    url: string
}