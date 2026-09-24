import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Social } from './schemas/social.schema';
import { Model } from 'mongoose';

@Injectable()
export class SocialsService {
    constructor(
        @InjectModel(Social.name) private socialModel: Model<Social>
    ){}

    async findAll(): Promise<Social[]> {
        return this.socialModel.find().exec();
    }
}
