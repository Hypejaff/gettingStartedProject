import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {Plog} from '@gpeel/plog';
import {Subscription} from 'rxjs';
import {MyGlobalService} from '../../core/services/my-global.service';
import {MyFeatureService} from '../core/my-feature.service';
import {Task} from '../model/task.model';
import {TasksStateService} from '../state/tasks-state.service';

@Component({
  template: `
    <refresh-count name="LIST-CONTAINER"></refresh-count>
    <app-list [tasks]="tasks"
               (removeTask)="onRemove($event)"
               (updateTask)="onUpdate($event)"
               (toggleAllTasks)="onToggleAll($event)"
    ></app-list>
    <!--    <todo-list [tasks]="tasksStateService.getTasks()"-->
  `,
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListContainerComponent implements OnInit, OnDestroy {
  tasks!: Task [];
  subscription: Subscription | undefined;

  constructor(private myFeatureService: MyFeatureService,
              private myGlobalService: MyGlobalService,
              private tasksStateService: TasksStateService,
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
    this.subscription = this.tasksStateService.getTasks$().subscribe(t => {
      this.tasks = t;
      this.cd.markForCheck();
    });
  }


  onRemove(task: Task) {
    this.tasksStateService.remove(task);
    // this.tasks = this.tasksStateService.getTasks();
  }

  onUpdate(task: Task) {
    this.tasksStateService.update(task);
  }

  onToggleAll(checked: boolean) {
    this.tasksStateService.toggleAll(checked);
  }


}
