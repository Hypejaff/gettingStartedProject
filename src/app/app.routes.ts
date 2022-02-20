import {Routes} from '@angular/router';
import {HomeComponent, PageNotFoundComponent} from './core';

export const appRoutes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: '**', component: PageNotFoundComponent},
];



