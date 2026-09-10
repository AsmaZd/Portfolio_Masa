import { IsEmail, IsEnum, IsString, Matches, MaxLength, MinLength } from "class-validator";


enum Role{
    admin = 'admin',
    user = 'user'
}

export class CreateUserDto{
    @IsString()
    @MinLength(4, {message: "Le pseudo doit faire plus de 4 caractères."})
    @MaxLength(20, {message: "Le pseudo doit faire moins de 20 caractères"})
    username: string;

    @IsEnum(Role)
    role: Role;

    @IsEmail()
    email: string;

    @IsString()
    @MinLength(4, {message: "Le mot de passe doit faire plus de 4 caractères."})
    @MaxLength(20, {message: "Le mot de passe doit faire moins de 20 caractères"})
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {message: 'Mot de passe trop faible.'})
    password: string
}