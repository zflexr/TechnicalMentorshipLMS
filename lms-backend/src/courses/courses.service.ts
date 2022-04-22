import { Model } from"mongoose";
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { Course, CourseDocument } from './schemas/course.schema';

@Injectable()
export class CoursesService {
  constructor(@InjectModel(Course.name) private courseModel: Model<CourseDocument>) {}

  private readonly checkIfCourseExists = async (id: string) => {
    try {
      const course = await this.courseModel.findById(id)
      if (!course) {
        throw new HttpException("Course not Found", HttpStatus.NOT_FOUND)
      }
      return course
    } catch (error) {
      if (error.name === "CastError") {
        throw new HttpException("Invalid Course ID", HttpStatus.BAD_REQUEST)
      }
      throw new HttpException(error.message || "Internal Server Error", error.status || HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  
  async create(createCourseDto: CreateCourseDto) {
    try {
      const course = await this.courseModel.create(createCourseDto)
      return course
    } catch (error) {
      throw new HttpException(error.message || "Internal Sever Error", error.status || HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async findAll() {
    try {
      const courses = await this.courseModel.find()
      if (!courses.length) {
        throw new HttpException("Resource Not Found", HttpStatus.NOT_FOUND)
      }
      return courses
    } catch (error) {
      throw new HttpException(error.message || "Internal Sever Error", error.status || HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async findOne(id: string) {
    try {
      const course = await this.courseModel.findById(id)
      if (!course) {
        throw new HttpException("Resource Not Found", HttpStatus.NOT_FOUND)
      }
      return course
    } catch (error) {
      throw new HttpException(error.message || "Internal Sever Error", error.status || HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async update(id: string, updateCourseDto: UpdateCourseDto) {
    try {
      await this.checkIfCourseExists(id)
      await this.courseModel.findByIdAndUpdate(id, updateCourseDto)
      const course = await this.courseModel.findById(id)
      return course
    } catch (error) {
      throw new HttpException(error.message || "Internal Sever Error", error.status || HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async remove(id: string) {
    try {
      await this.checkIfCourseExists(id)
      const result = await this.courseModel.findByIdAndDelete(id)
      return result
    } catch (error) {
      throw new HttpException(error.message || "Internal Sever Error", error.status || HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }
}
