import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema({timestamps: true})
export class Artwork extends Document{
    @Prop({ required: true})
    title: string;

    @Prop()
    description: string;

    @Prop({ required: true})
    imageUrl: string;
    
    @Prop({ required: true, enum: ['dessin', 'crochet', 'design'], default: 'dessin'})
    category: string;

    @Prop([String])
    tags: string[]

    @Prop({default: false})
    isFeatured: boolean
}

export const ArtworkSchema = SchemaFactory.createForClass(Artwork);