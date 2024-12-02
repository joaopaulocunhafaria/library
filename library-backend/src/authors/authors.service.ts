import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Author } from './entities/author.entity';
import { CreateAuthorDto } from './dto/create-author.dto';

@Injectable()
export class AuthorsService {
    constructor(
        @InjectRepository(Author)
        private authorsRepository: Repository<Author>,
    ) { }


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
        return this.findOne(id); // Retorna o autor atualizado
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
