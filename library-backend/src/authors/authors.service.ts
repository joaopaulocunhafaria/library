import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { Author } from './entities/author.entity';
import { CreateAuthorDto } from './dto/create-author.dto';
import { Book } from 'src/books/entities/book.entity';
import { UpdateAuthorDto } from './dto/update-author.dto';

@Injectable()
export class AuthorsService {
    constructor(
        @InjectRepository(Author)
        private authorsRepository: Repository<Author>,
        @InjectRepository(Book)
        private booksRepository: Repository<Book>,
        private dataSource: DataSource,

    ) { }

    async updateWithBooks(id: number, updateAuthorDto: UpdateAuthorDto): Promise<Author> {
        const author = await this.authorsRepository.findOne({
            where: { id },
            relations: ['books'],
        });

        if (!author) {
            throw new NotFoundException(`Author with ID ${id} not found`);
        }
 
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.startTransaction();

        try { 
            if (updateAuthorDto.name) author.name = updateAuthorDto.name;
            if (updateAuthorDto.birthDate) author.birthDate = updateAuthorDto.birthDate;
 
            if (updateAuthorDto.books && updateAuthorDto.books.length > 0) {
                for (const bookData of updateAuthorDto.books) {
                    const book = await this.booksRepository.findOne({
                        where: { id: bookData.id, author: { id: author.id } },
                    });

                    if (book) {
                        if (bookData.title) book.title = bookData.title;
                        if (bookData.publicationDate)
                            book.publicationDate = new Date(bookData.publicationDate);
                        await queryRunner.manager.save(book);
                    } else {
                        throw new NotFoundException(`Book with ID ${bookData.id} not found for this author`);
                    }
                }
            }
 
            await queryRunner.manager.save(author);
            await queryRunner.commitTransaction();

            return author;
        } catch (error) {
            await queryRunner.rollbackTransaction();
            throw error;
        } finally {
            await queryRunner.release();
        }
    }



    async findOne(id: number): Promise<Author> {
        const author = await this.authorsRepository.findOneBy({ id });

        if (!author) {
            throw new NotFoundException(`Author with ID ${id} not found`);
        }

        return author;
    }

    async update(id: number, updateAuthorDto: CreateAuthorDto): Promise<Author> {
        const author = await this.authorsRepository.findOneBy({ id });

        if (!author) {
            throw new NotFoundException(`Author with ID ${id} not found`);
        }

        await this.authorsRepository.update(id, updateAuthorDto);
        return this.findOne(id);  
    }

    async remove(id: number): Promise<void> {
        const author = await this.authorsRepository.findOneBy({ id });

        if (!author) {
            throw new NotFoundException(`Author with ID ${id} not found`);
        }

        await this.authorsRepository.delete(id);
    }
    create(createAuthorDto: CreateAuthorDto): Promise<Author> {
        const author = this.authorsRepository.create(createAuthorDto);
        return this.authorsRepository.save(author);
    }

    findAll(): Promise<Author[]> {
        return this.authorsRepository.find();
    }
}
