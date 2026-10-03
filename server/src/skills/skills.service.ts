import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { SkillsModule } from './skills.module';
import { Skill } from './schemas/skill.schema';
import { Model } from 'mongoose';

@Injectable()
export class SkillsService {

    constructor(
        @InjectModel(Skill.name) private skillModel: Model<Skill>,
    ){}

    async findAll(): Promise<Skill[]>{
        return this.skillModel.find().exec();
    }

    async findOne(id: string): Promise<Skill | null>{
        const skill = this.skillModel.findById(id).exec();
        if(!skill){
            throw new NotFoundException('Skill with the "${id}" ID, not found');
        }
        return skill;
    }
    
}
