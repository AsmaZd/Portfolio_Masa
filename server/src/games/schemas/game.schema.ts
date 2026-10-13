import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema({timestamps: true})
export class Game extends Document{
    @Prop({required: true})
    title: string

    @Prop({default: null})
    description: string

    @Prop({default: null})
    thumbnail: string

    @Prop({default: null})
    gameUrl: string

    @Prop({type: [String], default: []})
    images: string[]
}

export const GameSchema = SchemaFactory.createForClass(Game);