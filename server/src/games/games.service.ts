import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Game } from './schemas/game.schema';
import { Model } from 'mongoose';
import { CreateGameDto } from './dto/create-game.dto';

@Injectable()
export class GamesService {

    constructor(
        @InjectModel(Game.name) private gameModel: Model<Game>
    ){}

    async getAll(): Promise<Game[]>{
        return this.gameModel.find().exec();
    }

    async getOne(id: string): Promise<Game | null>{
        const game = this.gameModel.findById(id);

        if(!game){
            throw new NotFoundException('Game with the "${id}" ID, not found');
        }

        return game;
    }

    async create(game: CreateGameDto): Promise<Game>{
        const createdGame = new this.gameModel(game)
        return createdGame.save();
    }
}
