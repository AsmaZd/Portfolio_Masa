import { Controller, Get, Param } from '@nestjs/common';
import { SocialsService } from './socials.service';
import { ParseObjectIdPipe } from '@nestjs/mongoose';

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
}
