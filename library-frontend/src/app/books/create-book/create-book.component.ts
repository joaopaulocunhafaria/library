import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, switchMap, tap } from 'rxjs/operators';
import { FormsModule } from '@angular/forms';

interface Author {
  id: number;
  name: string;
}

interface Book {
  title: string;
  publicationDate: string;
  authorId: number;
}

@Component({
  selector: 'app-create-book',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './create-book.component.html',
  styleUrls: ['./create-book.component.scss'],
})
export class CreateBookComponent implements OnInit {
  book: Book = { title: '', publicationDate: '', authorId: 0 };
  authors: Author[] = [];
  isLoading$: Observable<boolean> = of(false);  
  error$: Observable<string | null> = of(null);  

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.loadAuthors();  
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
 
  createBook(): void {
    this.isLoading$ = of(true);  

    const apiUrl = 'http://localhost:3000/books';

    this.book.authorId =Number(this.book.authorId); 
    this.http
      .post<Book>(apiUrl, this.book) 
      .pipe(
        tap(() => {
          this.router.navigate(['/books']); 
        }),
        catchError((error) => {
          this.error$ = of('Failed to create book');
          return of(error); 
        })
      )
      .subscribe(() => {
        this.isLoading$ = of(false);  
      });
  }
}
