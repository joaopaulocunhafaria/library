import { IsString, IsNotEmpty, IsDateString, IsNumber } from 'class-validator';

export class CreateBookDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsDateString()
  publicationDate: string;

  @IsNumber()
  authorId: number;
}
