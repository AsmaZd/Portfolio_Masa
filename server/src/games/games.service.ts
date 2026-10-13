import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Game } from './schemas/game.schema';
import { Model } from 'mongoose';

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
}
