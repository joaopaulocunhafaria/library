import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

interface Book {
  id: number;
  title: string;
  publicationDate: string;
  authorId: number;  // Relacionamento com o autor
}

@Component({
  selector: 'app-books-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './books-list.component.html',
  styleUrls: ['./books-list.component.scss']
})
export class BooksListComponent implements OnInit {
  books: Book[] = [];

  constructor(private router: Router, private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchBooks();
  }

  fetchBooks(): void {
    const apiUrl = 'http://localhost:3000/books';  // URL da sua API
    this.http.get<Book[]>(apiUrl).subscribe(
      (data) => {
        this.books = data;
      },
      (error) => {
        console.error('Erro ao buscar livros:', error);
      }
    );
  }

  viewBookDetail(id: number): void {
    this.router.navigate(['/book', id]);
  }
}
