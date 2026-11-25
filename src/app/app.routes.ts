import { Routes } from '@angular/router';
import { LoginComponent } from './features/login/login';
import { Items } from './features/items/items';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'items', component: Items },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
];
