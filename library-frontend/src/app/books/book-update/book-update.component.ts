import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http'; 
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Observable, of } from 'rxjs';



interface Book {
  id:number;
  title: string;
  publicationDate: string;
  authorId: number;
}

interface Author {
  id: number;
  name: string;
}

@Component({
  standalone: true,
  imports :[FormsModule, RouterModule, CommonModule],
  selector: 'app-book-update',
  templateUrl: './book-update.component.html',
  styleUrls: ['./book-update.component.scss']
})
export class BookUpdateComponent implements OnInit {
  book: Book  = {
    id:-1,
    title: "",
    publicationDate:"",
    authorId: -1
  } ;  // Usado para armazenar o livro que será atualizado
  isLoading = false;
  errorMessage: string = '';
  error$: Observable<string | null> = of(null);  
  authors: Author[] = [];

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Pega o 'id' da rota
    const bookId = +this.route.snapshot.paramMap.get('id')!;
    this.getBookDetails(bookId); // Obtém os dados do livro
    this.loadAuthors()
  }
  loadAuthors(): void {
    this.http.get<Author[]>('http://localhost:3000/authors').subscribe(
      (authors) => {
        this.authors = authors;
      },
      (error) => {
        this.error$ = of('Failed to load authors');
      }
    );
  }

  // Função que busca os detalhes de um livro pela API
  getBookDetails(id: number): void {
    const apiUrl = `http://localhost:3000/books/${id}`;
    this.isLoading = true;

    this.http.get<Book>(apiUrl).subscribe(
      (bookData) => {
        this.book = bookData;
        this.isLoading = false;
      },
      (error) => {
        this.errorMessage = 'Erro ao buscar livro!';
        this.isLoading = false;
        console.error(error);
      }
    );
  }
 
  updateBook(): void {
    if (!this.book) return;

    const apiUrl = `http://localhost:3000/books/${this.book.id}`;
    const bookDto = {
      title: this.book.title,
      publicationDate: this.book.publicationDate,
      authorId: Number(this.book.authorId)
    };
    console.log(bookDto)
    this.http.put(apiUrl, bookDto).subscribe(
      () => {
        alert('Livro atualizado com sucesso!');
        this.router.navigate(['/books']);  
      },
      (error) => {
        console.error('Erro ao atualizar livro:', error);
        alert('Falha ao atualizar o livro!');
      }
    );
  }
}
