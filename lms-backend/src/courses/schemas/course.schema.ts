import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

export type CourseDocument = Course & Document;

@Schema()
export class Course {
    @Prop({ required: true })
    title: string;

    @Prop({ required: true })
    description: string;

    @Prop({ required: true })
    videoLink: string;

    @Prop({ required: true })
    image: string;
}

export const CourseSchema = SchemaFactory.createForClass(Course)