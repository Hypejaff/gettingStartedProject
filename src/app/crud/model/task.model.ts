export interface Task {
  id: number;
  label: string;
  completed: boolean;
}

export class TaskUtils {

  static nextId: number = 1;

  static createTask(label: string, completed: boolean = false): Task {
    return {id: this.nextId++, label, completed};
  }

}

export enum TASKS_FILTER_ENUM {
  ALL = 'ALL', ACTIVE = 'ACTIVE', COMPLETED = 'COMPLETED'
}
