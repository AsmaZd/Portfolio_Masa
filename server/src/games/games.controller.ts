import { Controller, Get, Param } from '@nestjs/common';
import { GamesService } from './games.service';

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
}
