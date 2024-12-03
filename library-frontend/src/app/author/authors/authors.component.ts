import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Router,RouterModule} from '@angular/router';

interface Author {
  id:number;
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
  authors: Author[] = [];

  constructor(private router: Router, private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchAuthors();
  }

  fetchAuthors(): void {
    const apiUrl = 'http://localhost:3000/authors';
    this.http.get<Author[]>(apiUrl).subscribe(
      (data) => { 
        this.authors = data;
      },
      (error) => {
        console.error('Erro ao buscar autores:', error);
      }
    );
  }

  viewAuthorDetail(id: number): void {
    this.router.navigate(['/author', id]);
  }
}
