import {HttpClientModule} from '@angular/common/http';
import {APP_INITIALIZER, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouterModule} from '@angular/router';
import {PlogModule} from '@gpeel/plog';
import {Observable, of} from 'rxjs';
import {environment} from '../environments/environment';
import {AppComponent} from './app.component';
import {appRoutes} from './app.routes';
import {CoreModule} from './core/core.module';
import {MyInitAtStartService} from './core/services/my-init-at-start.service';
import {CrudModule} from './crud/crud.module';
import {SharedModule} from './shared/shared.module';

/**
 * This factory function must return another function
 * which in turn should return either a Promise or an Observable.
 */
function initializeFactory(service: MyInitAtStartService): () => Observable<string> {
  console.log('MyInitAtStartService in NOW CREATED');
  // And you can invoke a method to prepare some data/logic if you need to
  service.init();
  return () => of('DONE');
}

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    CoreModule,
    SharedModule,
    RouterModule.forRoot(appRoutes),
    PlogModule.forRoot(environment),
    HttpClientModule,
    CrudModule
  ],
  providers: [
    // the following configs could be factorized inside CoreModule or
    // left here to attract attention if deemed important.
    MyInitAtStartService,
    {
      provide: APP_INITIALIZER,
      useFactory: initializeFactory,
      deps: [MyInitAtStartService],
      multi: true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
