import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema({timestamps: true})
export class Social extends Document{
    @Prop({required: true})
    plateform: string

    @Prop()
    logo: string

    @Prop()
    pseudo: string

    @Prop({required: true})
    url: string
}

export const SocialSchema = SchemaFactory.createForClass(Social);