import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Author } from 'src/authors/entities/author.entity';

@Entity()
export class Book {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  publicationDate: Date;

  @ManyToOne(() => Author, (author) => author.books, { eager: true })
  @JoinColumn({ name: 'authorId' })
  author: Author;
}
