import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema({timestamps: true})
export class Skill extends Document{
    @Prop({required: true})
    title: string

    @Prop({required: true})
    description: string

    @Prop([String])
    tag: string[]

    @Prop({default: true})
    isVisible: boolean

    @Prop()
    icon: string
}

export const SkillSchema = SchemaFactory.createForClass(Skill);