import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { RoleGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { AuthGuard } from '../auth/guards/auth.guard';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';

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

    @Post()
    create(@Body() message: CreateMessageDto){
        return this.messageService.create(message);
    }

    @UseGuards(AuthGuard, RoleGuard)
    @Roles('admin')
    @Patch(':id')
    update(@Param('id') id: string, @Body() message: UpdateMessageDto){
        return this.messageService.update(id, message);
    }

    @UseGuards(AuthGuard, RoleGuard)
    @Roles('admin')
    @Delete(':id')
    delete(@Param('id') id: string){
        return this.messageService.delete(id);
    }
}
