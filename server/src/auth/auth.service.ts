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
import { Response } from 'express';

@Injectable()
export class AuthService {
    constructor( 
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService
        ){}

    async register(registerDto: RegisterDto){
        const newUser = await this.usersService.create({
            ...registerDto,
            role: Role.USER
        });

        return this.signIn({
            email: newUser.email, 
            password: registerDto.password
        });
    };


    async signIn(signInDto: SignInDto){
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

        const token = this.jwtService.sign(payload);

        return {
            access_token: token,
            message: 'Connecté avec succès' };
    }

}
