import { Routes } from '@angular/router';
import { AuthorsComponent } from './author/authors/authors.component';
import { AuthorDetailComponent } from './author/author-detail/author-detail.component';
import { CreateAuthorComponent } from './author/create-author/create-author.component';
import { BooksListComponent } from './books/books-list/books-list.component';
import { BooksDetailsComponent } from './books/books-details/books-details.component';
import { CreateBookComponent } from './books/create-book/create-book.component';
import { HomeComponent } from './home/home.component';

export const appRoutes: Routes = [
    { path: '', component: HomeComponent     },
    { path: 'authors', component: AuthorsComponent },
    { path: 'author/:id', component: AuthorDetailComponent },
    { path: 'create-author', component: CreateAuthorComponent },
    { path: 'books', component: BooksListComponent },
    { path: 'books/:id', component: BooksDetailsComponent },
    { path: 'create-books', component: CreateBookComponent },
    
  ];