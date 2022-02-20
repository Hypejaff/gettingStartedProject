import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {Plog} from '@gpeel/plog';
import {MyGlobalService} from '../../core';
import {MyFeatureService} from '../core/my-feature.service';
import {TaskHttp} from '../core/task-http';
import {Task} from '../model/task.model';

@Component({
  template: `
    <refresh-count name="CREATE-CONTAINER"></refresh-count>
    <app-create (createdTask)="onCreate($event)"></app-create>

  `,
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateContainerComponent {

  constructor(private taskHttp: TaskHttp,
              private myFeatureService: MyFeatureService,
              private myGlobalService: MyGlobalService,
              private router: Router) {
    Plog.createComponent('CrudContainerComponent');
    myFeatureService.execute();
    myGlobalService.execute();
  }

  onCreate(task: Task) {
    // COMPLETE Code here to call create(task) on TaskHttp
    // and on return navigate back to /crud/list
    this.taskHttp.create(task).subscribe(
      t => {
        this.router.navigate(['/crud/list']);
        Plog.callback('SUCCESS onCreate!', t); // simulating toast
      },
      error => {
        Plog.callback('ERROR onCreate!', error); // simulating toast
      }
    );
  }

}
