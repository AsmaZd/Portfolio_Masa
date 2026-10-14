import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Message } from './schemas/messages.schema';
import { Model } from 'mongoose';

@Injectable()
export class MessagesService {
    constructor(
        @InjectModel(Message.name) private messageModel: Model<Message>
    ){}

    async findAll(): Promise<Message[]>{
        return this.messageModel.find().exec();
    }

    async findOne(id: string): Promise<Message | null>{
        const message = this.messageModel.findById(id).exec();

        if(!message){
            throw new NotFoundException('Message with the "${id}" ID, not found')
        }

        return message;
    }

}
