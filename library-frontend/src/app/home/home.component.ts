import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports:[RouterModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  constructor(private router: Router) {}

  // Método para navegar para a página de livros
  navigateToBooks() {
    this.router.navigate(['/books']);
  }

  // Método para navegar para a página de autores
  navigateToAuthors() {
    this.router.navigate(['/authors']);
  }
}
