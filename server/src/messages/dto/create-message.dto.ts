import { IsBoolean, IsEmail, IsNotEmpty, IsString, MaxLength, isNotEmpty } from "class-validator";

export class CreateMessageDto{
    @IsString()
    @IsNotEmpty()
    @MaxLength(100)
    name: string

    @IsEmail()
    @IsNotEmpty()
    email: string

    @IsString()
    @IsNotEmpty()
    @MaxLength(1000)
    content: string
}