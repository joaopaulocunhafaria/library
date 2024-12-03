import { Routes } from '@angular/router';
import { AuthorsComponent } from './authors/authors.component';
import { AuthorDetailComponent } from './author-detail/author-detail.component';
import { CreateAuthorComponent } from './create-author/create-author.component';

export const appRoutes: Routes = [
    { path: '', component: AuthorsComponent },
    { path: 'author/:id', component: AuthorDetailComponent },
    { path: 'create-author', component: CreateAuthorComponent },
  ];