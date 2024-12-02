import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Author } from './entities/author.entity';
import { CreateAuthorDto } from './dto/create-author.dto';

@Injectable()
export class AuthorsService {
  constructor(
    @InjectRepository(Author)
    private authorsRepository: Repository<Author>,
  ) {}

  create(createAuthorDto: CreateAuthorDto): Promise<Author> {
    const author = this.authorsRepository.create(createAuthorDto);
    return this.authorsRepository.save(author);
  }

  findAll(): Promise<Author[]> {
    return this.authorsRepository.find();
  }

  findOne(id: number): Promise<Author> {
    return this.authorsRepository.findOneBy({ id });
  }

  async update(id: number, updateAuthorDto: CreateAuthorDto): Promise<Author> {
    await this.authorsRepository.update(id, updateAuthorDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.authorsRepository.delete(id);
  }
}
