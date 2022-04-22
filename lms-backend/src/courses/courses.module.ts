import { Module } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CoursesController } from './courses.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Course } from './entities/course.entity';
import { CourseSchema } from './schemas/course.schema';

@Module({
  controllers: [CoursesController],
  providers: [CoursesService],
  imports: [
    MongooseModule.forFeature([
      {
        name: Course.name,
        schema: CourseSchema
      }
    ])
  ]
})
export class CoursesModule {}
