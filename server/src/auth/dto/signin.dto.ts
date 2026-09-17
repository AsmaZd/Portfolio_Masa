import { IsEmail, IsString, Matches, MaxLength, MinLength } from "class-validator";

export class SignInDto{
    @IsEmail()
    email: string;

    @IsString()
    password: string;
}