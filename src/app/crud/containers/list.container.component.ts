import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {Plog} from '@gpeel/plog';
import {Subscription} from 'rxjs';
import {mergeMap} from 'rxjs/operators';
import {MyGlobalService} from '../../core/services/my-global.service';
import {MyFeatureService} from '../core/my-feature.service';
import {TaskHttp} from '../core/task-http';
import {Task} from '../model/task.model';

@Component({
  template: `
    <refresh-count name="LIST-CONTAINER"></refresh-count>
    <app-list [tasks]="tasks"
               (removeTask)="onRemove($event)"
               (updateTask)="onUpdate($event)"
               (toggleAllTasks)="onToggleAll($event)"
    ></app-list>
    <!--    <todo-list [tasks]="tasksStateService.getTasks()"-->
    <!--               (removeTask)="onRemove($event)"-->
    <!--               (updateTask)="onUpdate($event)"-->
    <!--               (toggleAllTasks)="onToggleAll($event)"-->
    <!--    ></todo-list>-->
  `,
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListContainerComponent implements OnInit, OnDestroy {
  tasks!: Task [];
  subscription: Subscription | undefined;

  constructor(private myFeatureService: MyFeatureService,
              private myGlobalService: MyGlobalService,
              private taskHttp: TaskHttp,
              private cd: ChangeDetectorRef
  ) {
    Plog.createComponent('CrudContainerComponent');
    myFeatureService.execute();
    myGlobalService.execute();
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  ngOnInit(): void {
    Plog.ngOnInit('init finding tasks');
    // COMPLETE Code here to call findAll on TaskHttp
    this.taskHttp.findAll().subscribe(t => this.tasks = t);
  }


  onRemove(task: Task) {
    Plog.action('Removing task', task);
    // COMPLETE Code here to call remove(task) on TaskHttp
    // and on return swtichMap to refresh all tasks by calling findAll
    this.taskHttp.remove(task)
      .pipe(mergeMap(() => {
        return this.taskHttp.findAll();
      })).subscribe(
      ts => {
        this.tasks = ts; // last word ! impacting local data
        Plog.callback('SUCCESS onRemove!'); // simulating toast
      },
      error => {
        Plog.callback('ERROR onRemove!', error); // simulating toast
      }
    );
  }

  onUpdate(task: Task) {
    Plog.action('Updating task', task);
    // COMPLETE Code here to call update(task) on TaskHttp
    // and on return swtichMap to refresh all tasks by calling findAll
    this.taskHttp.update(task)
      .pipe(mergeMap(() => {
        return this.taskHttp.findAll();
      })).subscribe(
      ts => {
        this.tasks = ts; // last word ! impacting local data
        Plog.callback('SUCCESS onUpdate!'); // simulating toast
      },
      error => {
        Plog.callback('ERROR onUpdate!', error); // simulating toast
      }
    );
  }

  onToggleAll(checked: boolean) {
    Plog.action('Toggling all Tasks to completed', checked);
    // COMPLETE Code here to call toggleAll(task) on TaskHttp
    // and on return swtichMap to refresh all tasks by calling findAll
    // this.taskHttp.toggleAll(checked)
    // this.taskHttp.toggleAllWithTasksSolution2(checked, this.tasks)
    this.taskHttp.toggleAllWithTasksSolution3(checked, this.tasks)
      .pipe(mergeMap(() => {
        return this.taskHttp.findAll(); // only ONE final findAll
      })).subscribe(
      ts => {
        this.tasks = ts; // last word ! impacting local data
        Plog.callback('SUCCESS onToggleALL!'); // simulating toast
      },
      error => {
        Plog.callback('ERROR onToggleALL!', error); // simulating toast
      }
    );
  }


}
