import { IsString, IsOptional, IsArray, ArrayNotEmpty, IsInt, IsDateString } from 'class-validator';

export class UpdateAuthorDto {
  @IsString() 
  name : string;

  @IsString() 
  birthDate : string;

  @IsArray()
  @IsOptional()
  books?: UpdateBookDto[];
}

class UpdateBookDto {
  @IsInt()
  id: number;

  @IsString()
  @IsOptional()
  title?: string;

  @IsDateString()
  @IsOptional()
  publicationDate?: string;
}
