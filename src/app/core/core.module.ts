import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {HomeComponent} from './components/home.component';
import {PageNotFoundComponent} from './components/not-found.component';


@NgModule({
  declarations: [
    PageNotFoundComponent,
    HomeComponent
  ],
  imports: [
    CommonModule
  ]
})
export class CoreModule {
}
