import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Plog} from '@gpeel/plog';
import {forkJoin, from, Observable} from 'rxjs';
import {filter, last, map, mapTo, mergeAll, mergeMap} from 'rxjs/operators';
import {Task} from '../model/task.model';

const TASKS_URL = '/api/tasks';

@Injectable()
export class TaskHttp {

  constructor(private httpClient: HttpClient) {
  }

  findAll(): Observable<Task[]> {
    Plog.httpCall('findAll');
    // YOUR JOB, modify this code
    // return of([]);
    return this.httpClient.get<Task[]>(TASKS_URL);
  }


  create(task: Task): Observable<Task> {
    Plog.httpCall('create', task);
    // YOUR JOB, modify this code
    // and on return swtichMap to refresh all tasks by calling findAll
    // return of({label: 'FAKE', completed: true, id: 77777});
    return this.httpClient.post<Task>(TASKS_URL, task);
  }

  remove(task: Task): Observable<Task> {
    Plog.httpCall('Remove:', task);
    // YOUR JOB, modify this code
    // return of({label: 'FAKE', completed: true, id: 77777});
    return this.httpClient.delete<Task>(TASKS_URL + '/' + task.id);
  }

  update(task: Task): Observable<void> {
    Plog.httpCall('Update:', task);
    // YOUR JOB, modify this code
    // return EMPTY;
    return this.httpClient.put<void>(TASKS_URL, task);
  }

  toggleAll(checked: boolean): Observable<void> {
    return this.findAll()
      .pipe(
        // mergeMap((ts: Task[]) => ts), // spread the array into individual Task item in the stream
        mergeAll(), // does the same with less code, flattens input Observables or Arrays
        filter((t: Task) => t.completed !== checked),
        map(t => ({...t, completed: !t.completed})),
        mergeMap(t => this.update(t)), // one update per Task with complete prop to change
        last(), // to let only the last event data passthrough, we only need to know that it is finished
      );
  }


  toggleAllWithTasksSolution2(checked: boolean, tasks: Task[]): Observable<void> {
    const arrayObs = tasks
      .filter(t => t.completed !== checked)
      .map(t => this.update({...t, completed: checked}));

    // forkJoin enables parallel execution
    return forkJoin(arrayObs).pipe(mapTo(undefined));
  }

  toggleAllWithTasksSolution3(checked: boolean, tasks: Task[]): Observable<void> {
    return from(tasks)
      .pipe(
        filter(t => t.completed !== checked),
        mergeMap(t => this.update({...t, completed: checked})),
        last()
      );
  }


}


