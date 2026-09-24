import { Body, Controller, Get, HttpCode, HttpStatus, Post, UseGuards, Request, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/signin.dto';
import { AuthGuard } from './guards/auth.guard';
import { RegisterDto } from './dto/register.dto';
import * as express from 'express';
// import { Response as ExpressResponse } from 'express';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService){}

    @HttpCode(HttpStatus.CREATED)
    @Post('register')
    async register(@Body() registerDto: RegisterDto, @Res({passthrough: true}) res: express.Response){
        const result = await this.authService.register(registerDto);

        res.cookie('jwt', result.access_token, {
            httpOnly: true,
            secure: false, //TEMP
            sameSite: 'strict',
            maxAge: 1000 * 60 * 60
        })

        return {message: result.message};
    }

    @HttpCode(HttpStatus.OK)
    @Post('signin')
    async signIn(@Body() signInDto: SignInDto, @Res({passthrough: true}) res: express.Response){
        const result = await this.authService.signIn(signInDto);

        res.cookie('jwt', result.access_token, {
            httpOnly: true,
            secure: false, //TEMP
            sameSite: 'strict',
            maxAge: 1000 * 60 * 60
        })

        return {message: result.message};
    }

    @UseGuards(AuthGuard)
    @Get('me')
    findMe(@Request() request: any){
        return request.user;
    }

    @HttpCode(HttpStatus.OK)
    @UseGuards(AuthGuard)
    @Post('logout')
    logout(@Res({passthrough: true}) res: express.Response){
        res.clearCookie('jwt');
        return {message: 'deconnecté avec succès'};
    }

}
 