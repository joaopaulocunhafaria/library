import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';
import { BehaviorSubject, Observable,   catchError, map, of, switchMap } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Author {
  id: number;
  name: string;
  birthDate: string;
}

@Component({
  selector: 'app-authors',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.scss']
})
export class AuthorsComponent implements OnInit {
  private authorsSubject = new BehaviorSubject<Author[] | null>(null);
  authors$ = this.authorsSubject.asObservable();

  isLoading$ = new BehaviorSubject<boolean>(false);
  error$ = new BehaviorSubject<string | null>(null);

  constructor(private router: Router, private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchAuthors();
  }

  fetchAuthors(): void {
    this.isLoading$.next(true);
    this.error$.next(null);

    // Realiza a requisição à API para obter os autores
    this.http.get<Author[]>('http://localhost:3000/authors').pipe(
      map((data) => {
        // Emite os dados dos autores para o BehaviorSubject
        this.authorsSubject.next(data);
      }),
      catchError((error) => {
        // Emite erro caso haja falha na requisição
        this.error$.next('Failed to load authors');
        return [];
      }),
      switchMap(() => {
        this.isLoading$.next(false);
        return this.authors$; // Retorna o fluxo de dados dos autores
      })
    ).subscribe();
  }

  viewAuthorDetail(id: number): void {
    console.log("Numero de id do autor:" , id)
    this.router.navigate(['/author', id]);
  }


  deleteAuthor(id: number): void {
    if (confirm('Are you sure you want to delete this author?')) {
      this.isLoading$.next(true);

      this.http
        .delete(`http://localhost:3000/authors/${id}`)
        .pipe(
          switchMap(() => {
            // Refresh the list after deleting
            return this.http.get<Author[]>('http://localhost:3000/authors').pipe(
              map((authors) => {
                this.authorsSubject.next(authors);
                this.isLoading$.next(false);
              }),
              catchError((error) => {
                this.error$.next('Failed to refresh authors after deletion');
                this.isLoading$.next(false);
                return of(null);
              })
            );
          }),
          catchError((error) => {
            this.error$.next('Failed to delete the author');
            this.isLoading$.next(false);
            return of(null);
          })
        )
        .subscribe();
    }
  }
}
