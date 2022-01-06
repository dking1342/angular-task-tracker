import { Injectable } from '@angular/core';
import { Observable, of} from 'rxjs';
// import { TASKS } from '../mock-tasks';
import { Task } from '../Task';
import { HttpClient, HttpHeaders } from '@angular/common/http'

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl = "http://localhost:5000/tasks"

  constructor(private http:HttpClient) { }

  // observable with local file
  // getTasks(): Observable<Task[]>{
  //   const tasks = of(TASKS);
  //   return tasks;
  // }

  // coming from json-server
  getTasks(): Observable<Task[]>{
    return this.http.get<Task[]>(this.apiUrl);
  }

  deleteTask(task:Task):Observable<Task> {
    const url = `${this.apiUrl}/${task.id}`;
    return this.http.delete<Task>(url);
  }

  updateTaskReminder(task:Task):Observable<Task>{
    const url = `${this.apiUrl}/${task.id}`;
    return this.http.put<Task>(url,task,httpOptions);
  }

  postTask(task:Task):Observable<Task>{
    return this.http.post<Task>(this.apiUrl,task,httpOptions);
  }
}
