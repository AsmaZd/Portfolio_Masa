import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Message } from './schemas/messages.schema';
import { Model } from 'mongoose';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { MailsService } from '../mails/mails.service';

@Injectable()
export class MessagesService {
    constructor(
        @InjectModel(Message.name) private messageModel: Model<Message>,
        private readonly mailsService: MailsService
    ){}

    async findAll(): Promise<Message[]>{
        return this.messageModel.find().exec();
    }

    async findOne(id: string): Promise<Message | null>{
        const message = this.messageModel.findById(id).exec();

        if(!message){
            throw new NotFoundException(`Message with the "${id}" ID, not found`)
        }

        return message;
    }

    async create(message: CreateMessageDto): Promise<Message>{
        const createdMessage = new this.messageModel(message);

        this.mailsService
            .sendContactNotification(message.name, message.email, message.content)
            .catch(() => {})

        return createdMessage.save();
    }

    async update(id: string, message: UpdateMessageDto): Promise<Message>{
        const modifiedMessage = await this.messageModel.findByIdAndUpdate(id, message, {returnDocument: 'after'}).exec();

        if(!modifiedMessage){
            throw new NotFoundException(`Message with the "${id}" ID, not found`);
        }

        return modifiedMessage;
    }

    async delete(id: string): Promise<Message>{
        const deletedMessage = await this.messageModel.findByIdAndDelete(id).exec();

        if(!deletedMessage){
            throw new NotFoundException(`Message with the "${id}" ID, not found`);
        }

        return deletedMessage;
    }
}
