import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { SocialsService } from './socials.service';
import { ParseObjectIdPipe } from '@nestjs/mongoose';
import { AuthGuard } from '../auth/guards/auth.guard';
import { RoleGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { CreateSocialDto } from './dto/create-social.dto';

@Controller('socials')
export class SocialsController {
    constructor(private socialService: SocialsService) {}

    @Get()
    findAll(){
        return this.socialService.findAll();
    }

    @Get(':id')
    findOne(@Param('id', ParseObjectIdPipe) id: string){
        return this.socialService.findOne(id);
    }

    @UseGuards(AuthGuard, RoleGuard)
    @Roles('admin')
    @Post()
    create(@Body() social: CreateSocialDto){
        return this.socialService.create(social);
    }
}
