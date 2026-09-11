import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { UsersService } from "./users.service";
import { ParseObjectIdPipe } from "@nestjs/mongoose";
import { CreateUserDto } from "./dto/create-user.dto";

@Controller('users')
export class UsersController{
    constructor(private usersService: UsersService){}

    @Get()
    findAll(){
        return this.usersService.findAll();
    }

    @Get(':id')
    findOne(@Param('id', ParseObjectIdPipe) id: string){
        return this.usersService.findOne('id');
    }

    @Get('email/:email')
    findOneByEmail(@Param('email') email: string){
        return this.usersService.findOneByEmail(email);
    }

    @Post()
    create(@Body() user: CreateUserDto){
        return this.usersService.create(user);
    }
}
