import { IsNotEmpty, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateCourseDto {

    @ApiProperty({ description: "Course Title"})
    @IsString()
    @IsNotEmpty()
    title: string;

    @ApiProperty({ description: "Course Description"})
    @IsString()
    @IsNotEmpty()
    description: string;

    @ApiProperty({ description: "Course Youtube Link"})
    @IsString()
    @IsNotEmpty()
    videoLink: string;

    @ApiProperty({ description: "Course Thumbnail Image"})
    @IsString()
    @IsNotEmpty()
    image: string;
}
