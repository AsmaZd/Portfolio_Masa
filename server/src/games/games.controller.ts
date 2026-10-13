import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { GamesService } from './games.service';
import { AuthGuard } from '../auth/guards/auth.guard';
import { RoleGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';

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

    @UseGuards(AuthGuard, RoleGuard)
    @Roles('admin')
    @Patch(':id')
    update(@Param('id') id: string, @Body() game: UpdateGameDto){
        return this.gameService.update(id, game);
    }

    @UseGuards(AuthGuard, RoleGuard)
    @Roles('admin')
    @Delete(':id')
    delete(@Param('id') id: string){
        return this.gameService.delete(id);
    }

}
