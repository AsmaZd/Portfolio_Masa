import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { RegisterDto } from './dto/register.dto';
import { SignInDto } from './dto/signin.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor( 
        private readonly usersService: UsersService,
        private jwtService: JwtService
        ){}

    async signIn(signInDto: SignInDto): Promise<{ access_token: string}>{
        const user = await this.usersService.findOneByEmail(signInDto.email);
        if(!user){
            throw new UnauthorizedException ({message: "User inconnu"});
        }
        const isPasswordValid = await bcrypt.compare(signInDto.password, user.password);
        if(!isPasswordValid){
            throw new UnauthorizedException({message: "Mot de passe non valide"});
        }
        const payload = {sub: user._id, email: user.email, role: user.role, username: user.username};

        return {
            access_token: await this.jwtService.signAsync(payload),
        };
    }
}
