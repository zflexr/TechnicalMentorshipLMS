import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { ApiTags, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';

@ApiTags("Courses")
@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @Post()
  @ApiResponse({ status: 201, description: "Course Created"})
  @ApiResponse({ status: 500, description: "Internal Server Error"})
  @ApiBody({ type: CreateCourseDto })
  create(@Body() createCourseDto: CreateCourseDto) {
    return this.coursesService.create(createCourseDto);
  }

  @Get()
  @ApiResponse({ status: 201, description: "Courses Returned"})
  @ApiResponse({ status: 404, description: "No Course In Database"})
  findAll() {
    return this.coursesService.findAll();
  }

  @Get(':id')
  @ApiResponse({ status: 201, description: "Course Returned"})
  @ApiResponse({ status: 404, description: "Course Not In Database"})
  @ApiParam({ type: "string", name: "id" })
  findOne(@Param('id') id: string) {
    return this.coursesService.findOne(id);
  }

  @Patch(':id')
  @ApiResponse({ status: 201, description: "Course Returned"})
  @ApiResponse({ status: 404, description: "Course Not In Database"})
  @ApiParam({ type: "string", name: "id" })
  @ApiBody({ type: UpdateCourseDto })
  update(@Param('id') id: string, @Body() updateCourseDto: UpdateCourseDto) {
    return this.coursesService.update(id, updateCourseDto);
  }

  @Delete(':id')
  @ApiResponse({ status: 201, description: "Course Returned"})
  @ApiResponse({ status: 404, description: "Course Not In Database"})
  @ApiParam({ type: "string", name: "id" })
  remove(@Param('id') id: string) {
    return this.coursesService.remove(id);
  }
}
