import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MyPerfModule} from '@gpeel/my-perf-tools';


@NgModule({

  exports: [
    CommonModule,
    FormsModule,
    MyPerfModule,
  ]
})
export class SharedModule {
}
