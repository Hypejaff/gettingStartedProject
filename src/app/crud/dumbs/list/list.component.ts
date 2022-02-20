import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import {Plog} from '@gpeel/plog';
import {Task, TASKS_FILTER_ENUM,} from '../../model/task.model';

@Component({
  selector: 'todo-list',
  templateUrl: './list.component.html',
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListComponent implements OnChanges {

  remainingCount = 0;

  @Input() tasks: Task[] = [];
  @Output() removeTask = new EventEmitter<Task>();
  @Output() updateTask = new EventEmitter<Task>();
  @Output() toggleAllTasks = new EventEmitter<boolean>();

  tasksFilterStatus: TASKS_FILTER_ENUM = TASKS_FILTER_ENUM.ALL;
  TASKS_FILTER_ENUM = TASKS_FILTER_ENUM;

  constructor() {
    Plog.createComponent('ListComponent');
  }

  ngOnChanges(changes: SimpleChanges): void {
    Plog.ngOnChanges(changes);
  }

  onRemoveTask(task: Task) {
    this.removeTask.emit(task);
  }

  onToggleOneTask(task: Task) {
    this.updateTask.emit({...task, completed: !task.completed});
  }

  toggleAll(checked: boolean): void {
    this.toggleAllTasks.emit(checked);
  }

  remainingTasks(): number {
    Plog.info('remainTask computation', this.remainingCount++);
    return this.tasks.filter(task => !task.completed).length;
  }

  isFilterStatus(filter: TASKS_FILTER_ENUM) {
    return this.tasksFilterStatus === filter;
  }

  setTasksFilterStatus(filter: TASKS_FILTER_ENUM): void {
    this.tasksFilterStatus = filter;
  }


}
