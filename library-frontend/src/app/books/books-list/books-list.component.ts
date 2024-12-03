import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BehaviorSubject, catchError, map, Observable, of, switchMap } from 'rxjs';

interface Book {
  id: number;
  title: string;
  publicationDate: string;
}

@Component({
  selector: 'app-books-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './books-list.component.html',
  styleUrls: ['./books-list.component.scss'],
})
export class BooksListComponent implements OnInit {
  private booksSubject: BehaviorSubject<Book[] | null> = new BehaviorSubject<Book[] | null>(null);
  books$: Observable<Book[] | null> = this.booksSubject.asObservable();  
  isLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);  
  error$: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);  

  private apiUrl: string = 'http://localhost:3000/books'; 

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.fetchBooks();
  } 
  fetchBooks(): void {
    this.isLoading$.next(true);  
    this.error$.next(null);  

    this.http.get<Book[]>(this.apiUrl).pipe( 
      map((data) => { 
        return data;
      }),
      catchError((error) => { 
        this.error$.next('Erro ao carregar livros');
        return of([]);  
      }),
      switchMap((books) => { 
        this.booksSubject.next(books);
        return of(books);
      })
    ).subscribe({
      next: () => {
        this.isLoading$.next(false); 
      },
      error: (err) => {
        console.error('Erro:', err);
        this.isLoading$.next(false);  
      }
    });
  }
 
  viewBookDetail(id: number): void {
    this.router.navigate(['/books', id]);
  }

  deleteBook(bookId: number) {
    const confirmDelete = confirm('Are you sure you want to delete this book?');
    if (confirmDelete) {
      this.isLoading$.next(true);
      this.http.delete(`http://localhost:3000/books/${bookId}`).subscribe({
        next: () => {
          alert('Book deleted successfully.');
          this.fetchBooks(); // Atualiza a lista de livros após exclusão
        },
        error: () => {
          alert('Failed to delete the book.');
          this.isLoading$.next(false);
        },
      });
    }
  }
}
