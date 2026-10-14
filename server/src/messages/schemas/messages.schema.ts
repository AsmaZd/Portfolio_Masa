import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Message extends Document{
    @Prop({required: true, trim: true})
    name: string

    @Prop({required: true, trim: true})
    mail: string

    @Prop({required: true})
    content: string

    @Prop({default: false})
    isRead: boolean   
}

export const MessageSchema = SchemaFactory.createForClass(Message);