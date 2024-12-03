import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';


interface Author {
  name: string;
  birthDate: string;
}


@Component({
  selector: 'app-author-detail',
  standalone: true,
  imports:[RouterModule],
  templateUrl: './author-detail.component.html',
  styleUrls: ['./author-detail.component.scss']
})
export class AuthorDetailComponent implements OnInit {
  
  authors: Author[] = [];
  author: any;

  constructor(private route: ActivatedRoute,private http: HttpClient) { }

  ngOnInit(): void {
    // Pega o 'id' da rota
    var authorId = +this.route.snapshot.paramMap.get('id')!;
    
    // Aqui, você pode buscar os dados do autor em um serviço ou utilizar dados mockados
    this.author = this.getAuthorDetails( authorId);
  }

  // Simulando uma função de busca dos detalhes de um autor
  getAuthorDetails(id: number) { 
      const apiUrl = 'http://localhost:3000/authors/'+id; // Substitua pela URL real da API
      this.http.get<Author[]>(apiUrl).subscribe(
        (data) => {
          this.authors = data;
        },
        (error) => {
          console.error('Erro ao buscar autores:', error);
        }
      );
    

    return this.authors;
  }
}
