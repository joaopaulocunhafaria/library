import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Book } from './entities/book.entity';
import { CreateBookDto } from './dto/create-book.dto';
import { Author } from 'src/authors/entities/author.entity';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book)
    private booksRepository: Repository<Book>,
    @InjectRepository(Author)
    private authorsRepository: Repository<Author>,
  ) {}

  async create(createBookDto: CreateBookDto): Promise<Book> {
    const author = await this.authorsRepository.findOneBy({ id: createBookDto.authorId });

    if (!author) {
      throw new NotFoundException(`Author with ID ${createBookDto.authorId} not found`);
    }

    const book = this.booksRepository.create({
      title: createBookDto.title,
      publicationDate: new Date(createBookDto.publicationDate),
      author,
    });

    return this.booksRepository.save(book);
  }

  async findAll(): Promise<Book[]> {
    return this.booksRepository.find();
  }

  async findOne(id: number): Promise<Book> {
    const book = await this.booksRepository.findOne({
      where: { id },
      relations: ['author'],    
    });

    if (!book) {
      throw new NotFoundException(`Book with ID ${id} not found`);
    }

    return book;
  }

  async update(id: number, updateBookDto: CreateBookDto): Promise<Book> {
    const book = await this.booksRepository.findOneBy({ id });

    if (!book) {
      throw new NotFoundException(`Book with ID ${id} not found`);
    }

    const author = await this.authorsRepository.findOneBy({ id: updateBookDto.authorId });

    if (!author) {
      throw new NotFoundException(`Author with ID ${updateBookDto.authorId} not found`);
    }

    book.title = updateBookDto.title;
    book.publicationDate = new Date(updateBookDto.publicationDate);
    book.author = author;

    return this.booksRepository.save(book);
  }

  async remove(id: number): Promise<void> {
    const book = await this.booksRepository.findOneBy({ id });

    if (!book) {
      throw new NotFoundException(`Book with ID ${id} not found`);
    }

    await this.booksRepository.delete(id);
  }
}
