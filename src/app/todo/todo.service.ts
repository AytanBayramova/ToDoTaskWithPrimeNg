import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Todo } from './todo';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor(private http: HttpClient) { }

  getTodo(): Observable <Todo[]>{
    return this.http.get <Todo[]>('http://localhost:3000/todo');
  }

  addEditTask(postData:any, selectedTodo: any){
    if(!selectedTodo){
      return this.http.post('http://localhost:3000/todo', postData);

    } else{
      return this.http.put(`http://localhost:3000/todo/${selectedTodo.id}`, postData)
    }
  }

  deleteTodo (todoId:number){
    return this.http.delete(`http://localhost:3000/todo/${todoId}`)
  }
}
