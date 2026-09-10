import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { Document } from "mongoose";

@Schema({timestamps: true})
export class User extends Document{
    @Prop({required: true})
    pseudo: string;

    @Prop({required: true, enum: ['admin', 'user'], default: 'user'})
    role: string;

    @Prop({required: true, unique: true})
    email: string;

    @Prop({required: true})
    password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);