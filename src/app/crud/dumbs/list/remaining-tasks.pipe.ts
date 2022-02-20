import {Pipe, PipeTransform} from '@angular/core';
import {Plog} from '@gpeel/plog';
import {Task} from '../../model/task.model';

/**
 * This Pipe does ALL the work,
 * not only returning the number of remainingTasks but also the right message.
 * Usage :
 *       <span class="todo-count"><strong>{{ tasks |remainingTasks }}</strong></span>
 */
@Pipe({
  name: 'remainingTasks',
  pure: false
  // pure: true
})
export class RemainingTasksPipe implements PipeTransform {
  counter = 0;

  transform(tasks: Task[]): string {
    Plog.pipe('RemainingTasks Pipe computates:' + this.counter++);
    if (!tasks) return '';
    const num = tasks.filter(t => !t.completed).length;
    switch (num) {
      case 0:
        return 'No remaining tasks';
      case 1:
        return 'one remaining task';
      default:
        return `${num} remaining tasks`;
    }
  }

}









