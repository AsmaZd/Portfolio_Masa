import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { SkillsService } from './skills.service';
import { ParseObjectIdPipe } from '@nestjs/mongoose';
import { CreateSkillDto } from './dto/create-skill.dto';
import { RoleGuard } from '../auth/guards/roles.guard';
import { AuthGuard } from '../auth/guards/auth.guard';
import { Roles } from '../auth/decorators/roles.decorator';

@Controller('skills')
export class SkillsController {

    constructor( private skillService: SkillsService){}

    @Get()
    findAll(){
        return this.skillService.findAll();
    }

    @Get(':id')
    findOne(@Param('id', ParseObjectIdPipe)id: string){
        return this.skillService.findOne(id);
    }

    @UseGuards(AuthGuard, RoleGuard)
    @Roles('admin')
    @Post()
    create(@Body() skill: CreateSkillDto){
        return this.skillService.create(skill);
    }
}
