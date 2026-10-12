import { Body, Controller, Get, Put, UseGuards } from '@nestjs/common';
import { AboutService } from './about.service';
import { UpdateAboutDto } from './dto/update-about.dto';
import { AuthGuard } from '../auth/guards/auth.guard';
import { RoleGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

@Controller('about')
export class AboutController {

    constructor( private aboutService: AboutService){}

    @Get()
    findAbout(){
        return this.aboutService.findAbout();
    }

    @UseGuards(AuthGuard, RoleGuard)
    @Roles('admin')
    @Put()
    update(@Body() about: UpdateAboutDto){
        return this.aboutService.update(about);
    }
}
