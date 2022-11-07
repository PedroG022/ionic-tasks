import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private tasks: Task[] = [];
  constructor() { }

  public getTasksList() : Task[] {
    return this.tasks;
  }

  public getTask(index: number) : Task {
    return this.tasks[index];
  }

  public addTask(name: string, date: string) {
    let task: Task = {name: name, date: new Date(date.replace("-", "/")), done: false};
    this.tasks.push(task);
  }

  public deleteTask(index: number) {
    this.tasks.splice(index, 1);
  }

  public updateTask(index: number, name: string, date: string) {
    let task: Task = this.tasks[index];
    task.name = name;
    task.date = new Date(date.replace("-", "/"));
    this.tasks.splice(index, 1, task);
  }
}

interface Task {
  name: string;
  date: Date;
  done?: boolean;
}