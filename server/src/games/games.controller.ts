import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { GamesService } from './games.service';
import { AuthGuard } from '../auth/guards/auth.guard';
import { RoleGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { CreateGameDto } from './dto/create-game.dto';

@Controller('games')
export class GamesController {

    constructor(private gameService: GamesService){}

    @Get()
    getAll(){
        return this.gameService.getAll();
    }

    @Get(':id')
    getOne(@Param('id') id: string){
        return this.gameService.getOne(id);
    }

    @UseGuards(AuthGuard, RoleGuard)
    @Roles('admin')
    @Post()
    create(@Body() game: CreateGameDto){
        return this.gameService.create(game);
    }
}
