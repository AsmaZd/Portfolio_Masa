import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { RegisterDto } from './dto/register.dto';
import { SignInDto } from './dto/signin.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from '../users/dto/create-user.dto';
import passport from 'passport';
import { hash } from 'crypto';
import { Role } from '../users/enums/role.enum';

@Injectable()
export class AuthService {
    constructor( 
        private readonly usersService: UsersService,
        private jwtService: JwtService
        ){}

    async register(registerDto: RegisterDto){
        const hashedPassword = await bcrypt.hash(registerDto.password, 10);
        const newUser = await this.usersService.create({
            ...registerDto,
            password: hashedPassword,
            role: Role.USER
        });
        const payload = {
            sub: newUser._id,
            email: newUser.email,
            role: newUser.role,
            username: newUser.username
        };

        return {
            access_token: await this.jwtService.signAsync(payload),
        }

    }

    async signIn(signInDto: SignInDto): Promise<{ access_token: string}>{
        const user = await this.usersService.findOneByEmail(signInDto.email);
        if(!user){
            throw new UnauthorizedException ({message: "User inconnu"});
        }
        const isPasswordValid = await bcrypt.compare(signInDto.password, user.password);
        if(!isPasswordValid){
            throw new UnauthorizedException({message: "Mot de passe non valide"});
        }
        const payload = {
            sub: user._id, 
            email: user.email, 
            role: user.role, 
            username: user.username
        };

        return {
            access_token: await this.jwtService.signAsync(payload),
        };
    }
}
