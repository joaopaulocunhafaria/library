import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-create-author',
  standalone: true,
  imports: [FormsModule, RouterModule],
  templateUrl: './create-author.component.html',
  styleUrls: ['./create-author.component.scss'],
})
export class CreateAuthorComponent {
  author = {
    name: '',
    birthDate: ''
  };

  constructor(private http: HttpClient, private router: Router) { }
 
  createAuthor() {
    const apiUrl = 'http://localhost:3000/authors';  

    this.http.post(apiUrl, this.author).subscribe({
      next: (response) => {
        console.log('Server response:', response);  
        alert('Author created successfully!');
        this.router.navigate(['/']);  
      },
      error: (error) => {
        console.error('There was an error!', error);
        alert('Failed to create author!');
      }
    });
    
  }
}
