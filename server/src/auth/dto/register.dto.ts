import { IsEmail, IsNotEmpty, IsString, Matches, MaxLength, MinLength } from "class-validator";

export class RegisterDto{
    @IsString()
    @IsNotEmpty()
    @MinLength(4, {message: "Le pseudo doit faire plus de 4 caractères."})
    @MaxLength(20, {message: "Le pseudo doit faire moins de 20 caractères."})
    username: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(4, {message: "Le mot de passe doit faire plus de 4 caractères."})
    @MaxLength(20, {message: "Le mot de passe doit faire moins de 20 caractères."})
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {message: 'Mot de passe trop faible.'})
    password: string;
    static password: string;
}