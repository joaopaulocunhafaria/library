import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { CommonModule } from '@angular/common';

interface Author {
  id: number;
  name: string;
  birthDate: string;
}

@Component({
  selector: 'app-authors',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.scss']
})
export class AuthorsComponent implements OnInit {
  private authorsSubject: BehaviorSubject<Author[] | null> = new BehaviorSubject<Author[] | null>(null);
  authors$: Observable<Author[] | null> = this.authorsSubject.asObservable();

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
    this.router.navigate(['/author', id]);
  }
}
