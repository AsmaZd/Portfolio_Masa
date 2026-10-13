import { Injectable } from '@nestjs/common';
import { Homepage } from './schemas/homepage.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose'

@Injectable()
export class HomepageService {

    constructor(
        @InjectModel(Homepage.name) private homepageModel: Model<Homepage>
    ){}

    async findHomepage(): Promise<Homepage>{
        const homepage = await this.homepageModel
        .findOne()
        .populate('featuredArtworks')
        .populate('socials')
        .exec();

        if (!homepage){
            return this.homepageModel.create({
                featuredArtwork: [],
                socials: []
            });
        }

        return homepage;
    }
}
