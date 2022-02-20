import {Injectable} from '@angular/core';
import {Plog} from '@gpeel/plog';
import {BehaviorSubject, Observable} from 'rxjs';
import {Task, TaskUtils} from '../model/task.model';

const INITIAL_TASKS = [
  TaskUtils.createTask('Go drink beers', true),
  TaskUtils.createTask('Go to Mars'),
  TaskUtils.createTask('Play sports')
];


@Injectable()
export class TasksStateService {

  private tasks: Task[];
  private tasks$: BehaviorSubject<Task[]> = new BehaviorSubject<Task[]>(INITIAL_TASKS);

  constructor() {
    this.tasks = INITIAL_TASKS;
  }

  // getTasks(): Task[] {
  //   return this.tasks;
  // }

  getTasks$(): Observable<Task[]> {
    return this.tasks$.asObservable();
  }


  add(task: Task) {
    Plog.state('Create:', task);
    // IMMUTABLE WAY
    this.tasks = [...this.tasks, task];
    this.tasks$.next(this.tasks);
    // SAME REFERENCE
    // this.tasks.push(task);
    Plog.state('TASKs:', this.tasks);
  }

  remove(task: Task) {
    Plog.state('Remove:', task);
    // IMMUTABLE WAY
    this.tasks = this.tasks.filter(t => t.id !== task.id);
    this.tasks$.next(this.tasks);
    // SAME REFERENCE
    // this.tasks.splice(this.tasks.findIndex(t => t.id === task.id), 1);
    Plog.state('TASKs:', this.tasks);
  }

  update(task: Task) {
    Plog.state('Update:', task);
    // IMMUTABLE WAY
    this.tasks = this.tasks.map(t => t.id === task.id ? task : t);
    this.tasks$.next(this.tasks);
    // SAME REFERENCE
    // this.tasks.find(t => t.id === task.id)!.completed = task.completed;
    Plog.state('TASKs:', this.tasks);
  }

  toggleAll(checked: boolean) {
    Plog.state('ToggleAll:', checked);
    // IMMUTABLE WAY
    let modified = false;
    const newTasks = this.tasks.map(t => {
      if (t.completed === checked) {
        return t;
      } else {
        modified = true;
        return {...t, completed: checked};
      }
    });
    if (modified) {
      this.tasks = newTasks;
      this.tasks$.next(this.tasks);
    }
    // SAME REFERENCE
    // this.tasks.forEach(task => task.completed = checked);
    Plog.state('TASKs:', this.tasks);
  }

}
