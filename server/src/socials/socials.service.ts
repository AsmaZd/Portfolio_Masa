import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Social } from './schemas/social.schema';
import { Model } from 'mongoose';
import { CreateSocialDto } from './dto/create-social.dto';

@Injectable()
export class SocialsService {
    constructor(
        @InjectModel(Social.name) private socialModel: Model<Social>
    ){}

    async findAll(): Promise<Social[]> {
        return this.socialModel.find().exec();
    }

    async findOne(id: string): Promise<Social | null> {
        const social = this.socialModel.findById(id).exec();
        if(!social){
            throw new NotFoundException('Social media with the "${id}" ID, not found')
        }
        return social;
    }

    async create(social: CreateSocialDto): Promise<Social>{
        const createdSocial = new this.socialModel(social);
        return createdSocial.save();
    }
}
