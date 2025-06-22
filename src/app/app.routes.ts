import { Routes } from '@angular/router';
import { Chat } from './chat/chat';
import { Home } from './home/home';

export const routes: Routes = [
  { path: '', redirectTo: 'Home', pathMatch: 'full' },
  { path: 'chat', component: Chat },
  { path: 'home', component: Home },
  { path: '**', redirectTo: 'home' }   
];
