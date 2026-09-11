import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { RegisterDto } from './dto/register.dto';
import { SignInDto } from './dto/signin.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor( 
        private readonly usersService: UsersService,
        private jwtService: JwtService
        ){}

    async signIn(signInDto: SignInDto): Promise<{ access_token: string}>{
        const user = await this.usersService.findOneByEmail(signInDto.email);
        if(user?.password !== signInDto.password){
            throw new UnauthorizedException({message: "Mot de passe non valide"});
        }
        const payload = {sub: user._id, email: user.email};
        return {
            access_token: await this.jwtService.signAsync(payload),
        };
    }
}
