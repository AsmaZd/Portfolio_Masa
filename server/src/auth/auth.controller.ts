import { Body, Controller, Get, HttpCode, HttpStatus, Post, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/signin.dto';
import { AuthGuard } from './guards/auth.guard';
import { RegisterDto } from './dto/register.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService){}

    @HttpCode(HttpStatus.OK)
    @Post('signin')
    signIn(@Body() signInDto: SignInDto){
        return this.authService.signIn(signInDto);
    }

    @UseGuards(AuthGuard)
    @Get('me')
    findMe(@Request() request: any){
        return request.user;
    }

}
 