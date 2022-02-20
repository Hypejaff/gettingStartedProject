import {Routes} from '@angular/router';
import {CreateContainerComponent} from './containers/create.container.component';
import {ListContainerComponent} from './containers/list.container.component';

export const crudRoutes: Routes = [
  {
    path: 'crud', children: [
      {path: '', redirectTo: '/crud/list', pathMatch: 'full'},
      {path: 'create', component: CreateContainerComponent},
      {path: 'list', component: ListContainerComponent},
    ]
  },
];



