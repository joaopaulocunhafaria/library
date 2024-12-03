import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

interface Author {
  id:number;
  name: string;
  birthDate: string;
}

@Component({
  selector: 'app-author-detail',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule],
  templateUrl: './author-detail.component.html',
  styleUrls: ['./author-detail.component.scss']
})
export class AuthorDetailComponent implements OnInit {

  private authorSubject: BehaviorSubject<Author | null> = new BehaviorSubject<Author | null>(null);
  author$ = this.authorSubject.asObservable();  

  isLoading$ = new BehaviorSubject<boolean>(false);
  error$ = new BehaviorSubject<string | null>(null);

  constructor(private route: ActivatedRoute, private http: HttpClient) { }

  ngOnInit(): void {
    this.fetchAuthorDetails();
  }

  fetchAuthorDetails(): void {
    const authorId = +this.route.snapshot.paramMap.get('id')!;

    if (isNaN(authorId)) {
      this.error$.next('Invalid author ID');
      return;
    }

    this.isLoading$.next(true);
    this.error$.next(null);
 
    this.http.get<Author>(`http://localhost:3000/authors/${authorId}`).pipe(
      map((authorData) => { 
        this.authorSubject.next(authorData);
      }),
      catchError((error) => {
        this.error$.next('Failed to load author details');
        return [];
      })
    ).subscribe(() => {
      this.isLoading$.next(false);
    });
  }
}
