import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { RoleGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { AuthGuard } from '../auth/guards/auth.guard';

@Controller('messages')
export class MessagesController {

    constructor(private messageService: MessagesService){}

    @UseGuards(AuthGuard, RoleGuard)
    @Roles('admin')
    @Get()
    findAll(){
        return this.messageService.findAll();
    }

    @UseGuards(AuthGuard, RoleGuard)
    @Roles('admin')
    @Get(':id')
    findOne(@Param('id') id: string){
        return this.messageService.findOne(id);
    }
}
