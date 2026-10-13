import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";


@Schema({timestamps: true})
export class Homepage extends Document{
    @Prop({default: null})
    heroTitle: string

    @Prop({default: null})
    heroSubtitle: string

    @Prop({default: null})
    heroImage: string

    @Prop({type: [{ type: Types.ObjectId, ref: 'Artwork'}], default: []})
    featuredArtwork: Types.ObjectId[];
    
    @Prop({type: [{ type: Types.ObjectId, ref: 'Social'}], default: []})
    socials: Types.ObjectId[];
}

export const HomepageSchema = SchemaFactory.createForClass(Homepage);