import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { About } from './schemas/about.schema';
import { Model } from 'mongoose';
import { UpdateAboutDto } from './dto/update-about.dto';

@Injectable()
export class AboutService {

    constructor(
        @InjectModel(About.name) private aboutModel: Model<About>
    ){}

    async findAbout(): Promise<About>{
        let about = await this.aboutModel.findOne().exec();

        if (!about){
            about = await this.aboutModel.create({journey: []});
        }

        return about;
    }
    
    async update(about: UpdateAboutDto): Promise<About>{
        return this.aboutModel.findOneAndUpdate({}, about, {
            new: true,
            upsert: true,
            setDefaultsOnInsert: true,
        })
    }
}
