import { Controller, Get } from '@nestjs/common';
import { SocialsService } from './socials.service';

@Controller('socials')
export class SocialsController {
    constructor(private socialService: SocialsService) {}

    @Get()
    findAll(){
        return this.socialService.findAll();
    }

}
