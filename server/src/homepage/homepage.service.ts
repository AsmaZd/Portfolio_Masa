import { BadRequestException, Injectable } from '@nestjs/common';
import { Homepage } from './schemas/homepage.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose'
import { Types } from 'mongoose'
import { UpdateHomepageDto } from './dto/update-homepage.dto';

@Injectable()
export class HomepageService {

    constructor(
        @InjectModel(Homepage.name) private homepageModel: Model<Homepage>,
    ){}

    async findHomepage(): Promise<Homepage>{
        const homepage = await this.homepageModel
        .findOne()
        .populate('featuredArtwork')
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

    async update(homepage: UpdateHomepageDto): Promise<Homepage>{
        this.validatedObjectsIds(homepage);

        return this.homepageModel.findOneAndUpdate({}, homepage,{
            new: true,
            upsert: true,
            setDefaultsOnInsert: true,
        }).exec();
    }

    private validatedObjectsIds(homepage: UpdateHomepageDto){
        const ids = [...(homepage.featuredArtwork ?? []), ...(homepage.socials ?? [])];
        
        for (const id of ids){
            if(!Types.ObjectId.isValid(id)){
                throw new BadRequestException(`"${id}" n'est pas un ObjectId valide`);
            }
        }
    }
}
