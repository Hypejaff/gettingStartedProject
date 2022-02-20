import {Pipe, PipeTransform} from '@angular/core';
import {Plog} from '@gpeel/plog';
import {Task, TASKS_FILTER_ENUM} from '../../model/task.model';

@Pipe({
  name: 'tasksFilterPipe',
  pure: false
})
export class TasksFilterPipe implements PipeTransform {
  counter = 0;

  transform(tasks: Task[], status: TASKS_FILTER_ENUM): Task[] {
    Plog.pipe('pipe computation:' + this.counter++);
    if (!tasks) return [];
    let res!: Task[];

    if (status === TASKS_FILTER_ENUM.ALL) {
      res = tasks;
    } else if (status === TASKS_FILTER_ENUM.COMPLETED) {
      res = tasks.filter(tc => tc.completed);
    } else if (status === TASKS_FILTER_ENUM.ACTIVE) {
      res = tasks.filter(tc => !tc.completed);
    }
    return res;
  }

}









