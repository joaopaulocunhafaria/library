import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { AuthorsService } from './authors.service';
import { CreateAuthorDto } from './dto/create-author.dto';
import { Author } from './entities/author.entity';
import { UpdateAuthorDto } from './dto/update-author.dto';

@Controller('authors')
export class AuthorsController {
  constructor(private readonly authorsService: AuthorsService) {}

  @Post()
  create(@Body() createAuthorDto: CreateAuthorDto): Promise<Author> {
    return this.authorsService.create(createAuthorDto);
  }

  @Get()
  findAll(): Promise<Author[]> {
    return this.authorsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Author> {
    return this.authorsService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() updateAuthorDto: CreateAuthorDto): Promise<Author> {
    return this.authorsService.update(id, updateAuthorDto);
  }

  @Put('updatewithbooks/:id')
  updatewithbook(@Param('id') id: number, @Body() updateAuthorDto: UpdateAuthorDto): Promise<Author> {
    return this.authorsService.updateWithBooks(id, updateAuthorDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.authorsService.remove(id);
  }
}
