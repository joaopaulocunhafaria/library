import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { AuthorsComponent } from "./authors/authors.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AuthorsComponent,RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'library-frontend';
}
