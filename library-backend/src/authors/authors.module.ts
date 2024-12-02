import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Author } from './entities/author.entity';
import { AuthorsService } from './authors.service';
import { AuthorsController } from './authors.controller';
import { BooksModule } from 'src/books/books.module';
import { Book } from 'src/books/entities/book.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Author, Book]), BooksModule],
  providers: [AuthorsService],
  controllers: [AuthorsController],
})
export class AuthorsModule {}
