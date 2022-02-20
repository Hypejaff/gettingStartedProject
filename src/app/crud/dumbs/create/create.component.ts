import {Component, EventEmitter, Output} from '@angular/core';
import {Plog} from '@gpeel/plog';
import {Task, TaskUtils} from '../../model/task.model';
import {MyStateService} from './my-state.service';

@Component({
  selector: 'app-create',
  template: `
    <refresh-count name="CREATE"></refresh-count>
    <form>
      <input type="text" class="new-todo" placeholder="Add a task"
             autocomplete="off"
             name="task" [(ngModel)]="newTaskString"
             autofocus
             (keyup.enter)="addTask()"/>
    </form>
  `,
  providers: [MyStateService]
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateComponent {

  @Output() createdTask = new EventEmitter<Task>();
  newTaskString = '';

  constructor(private myStateService: MyStateService) {
    Plog.createComponent('CreateComponent');
    myStateService.execute();
  }

  addTask(): void {
    Plog.info('CreateComponent.addTask', this.newTaskString);
    this.createdTask.emit(TaskUtils.createTask(this.newTaskString));
    this.newTaskString = '';
  }

}