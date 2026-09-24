import { Body, Controller, Get, Param, Post, UseGuards } from "@nestjs/common";
import { UsersService } from "./users.service";
import { ParseObjectIdPipe } from "@nestjs/mongoose";
import { CreateUserDto } from "./dto/create-user.dto";
import { AuthGuard } from "../auth/guards/auth.guard";
import { RoleGuard } from "../auth/guards/roles.guard";
import { Admin } from "mongodb";
import { Roles } from "../auth/decorators/roles.decorator";

@Controller('users')
export class UsersController{
    constructor(private usersService: UsersService){}

    @UseGuards(AuthGuard, RoleGuard)
    @Roles('admin')
    @Get()
    findAll(){
        return this.usersService.findAll();
    }

    @UseGuards(AuthGuard, RoleGuard)
    @Roles('admin')
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
