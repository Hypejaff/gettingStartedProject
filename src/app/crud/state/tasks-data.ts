import {Plog} from '@gpeel/plog';
import {Task, TaskUtils} from '../model/task.model';


export class TasksData {

  createDb(): { tasks: Task[] } {
    Plog.state('CREATING FAKE DB Backend');
    const tasks: Task[] = [
      TaskUtils.createTask('Go drink beers in backend', true),
      TaskUtils.createTask('Go to Mars in backend'),
      TaskUtils.createTask('Play sports in backend')
    ];
    return {tasks};
  }
}
