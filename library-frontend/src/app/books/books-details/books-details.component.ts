import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { BehaviorSubject, catchError, map, Observable, of, switchMap } from 'rxjs';
import { CommonModule } from '@angular/common';

interface Book {
  id: number;
  title: string;
  publicationDate: string;
  authorId: number;
}

interface Author {
  id: number;
  name: string;
}

@Component({
  selector: 'app-books-details',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './books-details.component.html',
  styleUrls: ['./books-details.component.scss'],
})
export class BooksDetailsComponent implements OnInit {
  book$: BehaviorSubject<Book | null> = new BehaviorSubject<Book | null>(null);  
  author$: BehaviorSubject<Author | null> = new BehaviorSubject<Author | null>(null);  
  isLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false); 
  error$: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);  

  private apiUrl: string = 'http://localhost:3000/books';  
  private authorApiUrl: string = 'http://localhost:3000/authors';  

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadBookDetails();
  }
 
  loadBookDetails(): void {
    const bookId = Number(this.route.snapshot.paramMap.get('id'));  

    if (!bookId) {
      this.error$.next('Invalid Book ID');
      return;
    }

    this.isLoading$.next(true);  
    this.error$.next(null);   
    this.http.get<Book>(`${this.apiUrl}/${bookId}`).pipe(
      switchMap((book) => { 
        this.book$.next(book);
        return this.http.get<Author>(`${this.authorApiUrl}/${book.authorId}`);
      }),
      map((author) => { 
        this.author$.next(author);
      }),
      catchError((error) => { 
        this.error$.next('Error loading book details.');
        return of(null); 
      })
    ).subscribe({
      next: () => {
        this.isLoading$.next(false); 
      },
      error: (err) => {
        console.error('Error loading book or author:', err);
        this.isLoading$.next(false);  
      }
    });
  }
}
