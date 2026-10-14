import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Message } from './schemas/messages.schema';
import { Model } from 'mongoose';
import { CreateMessageDto } from './dto/create-message.dto';

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

    async create(message: CreateMessageDto): Promise<Message>{
        const createdMessage = new this.messageModel(message);
        return createdMessage.save();
    }

}
