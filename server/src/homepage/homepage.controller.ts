import { Body, Controller, Get, Put, UseGuards } from '@nestjs/common';
import { HomepageService } from './homepage.service';
import { RoleGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UpdateHomepageDto } from './dto/update-homepage.dto';
import { AuthGuard } from '../auth/guards/auth.guard';

@Controller('homepage')
export class HomepageController {

    constructor(private homepageService: HomepageService){}

    @Get()
    findHomepage(){
        return this.homepageService.findHomepage();
    }

    @UseGuards(AuthGuard, RoleGuard)
    @Roles('admin')
    @Put()
    update(@Body() homepage: UpdateHomepageDto){
        return this.homepageService.update(homepage);
    }
}
