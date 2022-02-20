import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {Plog} from '@gpeel/plog';
import {MyGlobalService} from '../../core';
import {MyFeatureService} from '../core/my-feature.service';
import {Task} from '../model/task.model';
import {TasksStateService} from '../state/tasks-state.service';

@Component({
  template: `
    <refresh-count name="CREATE-CONTAINER"></refresh-count>
    <app-create (createdTask)="onCreate($event)"></app-create>

  `,
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateContainerComponent {

  constructor(private myFeatureService: MyFeatureService,
              private myGlobalService: MyGlobalService,
              private tasksStateService: TasksStateService,
              private router: Router) {
    Plog.createComponent('CrudContainerComponent');
    myFeatureService.execute();
    myGlobalService.execute();
  }

  onCreate(task: Task) {
    this.tasksStateService.add(task);
    this.router.navigate(['/crud/list']);
  }

}
