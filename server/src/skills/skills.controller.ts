import { Controller, Get, Param } from '@nestjs/common';
import { SkillsService } from './skills.service';
import { ParseObjectIdPipe } from '@nestjs/mongoose';

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
}
