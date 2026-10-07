import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({timestamps: true})
export class About extends Document{
    @Prop({default: null})
    photo: string

    @Prop({default: null})
    bio: string

    @Prop({ type: [{title: String, description: String, date: String}], default: []})
    parcours: {title: String; description: String; date: String}[]

    @Prop({default: null})
    cvUrl: string
}

export const AboutSchema = SchemaFactory.createForClass(About);