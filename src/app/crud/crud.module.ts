import {HttpClientModule} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {SharedModule} from '../shared/shared.module';
import {CreateContainerComponent} from './containers/create.container.component';
import {ListContainerComponent} from './containers/list.container.component';
import {MyFeatureService} from './core/my-feature.service';
import {TaskHttp} from './core/task-http';
import {crudRoutes} from './crud.routes';
import {CreateComponent} from './dumbs/create/create.component';
import {ListComponent} from './dumbs/list/list.component';
import {RemainingTasksPipe} from './dumbs/list/remaining-tasks.pipe';
import {TasksFilterPipe} from './dumbs/list/tasks-filter.pipe';


@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(crudRoutes),
    HttpClientModule,
  ],
  declarations: [
    ListContainerComponent,
    CreateContainerComponent,
    CreateComponent,
    ListComponent,
    RemainingTasksPipe,
    TasksFilterPipe,
  ],
  providers: [MyFeatureService, TaskHttp],
  exports: []
})
export class CrudModule {
}
