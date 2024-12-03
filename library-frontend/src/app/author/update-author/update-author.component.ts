import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

interface Author {
  id: number;
  name: string;
  birthDate: string;
  [key: string]: string | number; 
}

@Component({
  selector: 'app-update-author',
  standalone: true,
  imports:[FormsModule, CommonModule, RouterModule],
  templateUrl: './update-author.component.html',
  styleUrls: ['./update-author.component.scss']
})
export class UpdateAuthorComponent implements OnInit {
  
  authorSubject: BehaviorSubject<Author | null> = new BehaviorSubject<Author | null>(null);
  author$ = this.authorSubject.asObservable();
  
  isLoading$ = new BehaviorSubject<boolean>(false);
  error$ = new BehaviorSubject<string | null>(null);

  author: Author | null = null;
  authorId!: number;

  constructor(
    private route: ActivatedRoute, 
    private http: HttpClient,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.authorId = +this.route.snapshot.paramMap.get('id')!;
    this.fetchAuthorDetails();
  }

  fetchAuthorDetails(): void {
    this.isLoading$.next(true);
    const apiUrl = `http://localhost:3000/authors/${this.authorId}`;
    
    this.http.get<Author>(apiUrl).pipe(
      map((authorData) => {
        this.authorSubject.next(authorData);
        this.isLoading$.next(false);
      }),
      catchError((error) => {
        this.error$.next('Failed to load author details');
        this.isLoading$.next(false);
        return [];
      })
    ).subscribe();
  }

  updateAuthor(): void {
    if (this.author) {
      this.isLoading$.next(true);
      const apiUrl = `http://localhost:3000/authors/${this.author.id}`;

      this.http.put(apiUrl, this.author).pipe(
        map(() => {
          this.isLoading$.next(false);
          this.router.navigate(['/authors']);  
        }),
        catchError((error) => {
          this.error$.next('Failed to update author');
          this.isLoading$.next(false);
          return [];
        })
      ).subscribe();
    }
  }

  onInputChange(event: any, field: string): void {
    if (this.author) {
      this.author[field] = event.target.value;
    }
  }
}
