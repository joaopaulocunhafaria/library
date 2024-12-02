import { Book } from 'src/books/entities/book.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class Author {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column( )
  birthDate: string;


  @OneToMany(() => Book, (book) => book.author)
  books: Book[];
}
