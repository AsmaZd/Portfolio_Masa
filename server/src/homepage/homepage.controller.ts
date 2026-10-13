import { Controller, Get } from '@nestjs/common';
import { HomepageService } from './homepage.service';

@Controller('homepage')
export class HomepageController {

    constructor(private homepageService: HomepageService){}

    @Get()
    findHomepage(){
        return this.homepageService.findHomepage();
    }
}
