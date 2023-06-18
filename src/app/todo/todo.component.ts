import { Component, OnDestroy, OnInit } from '@angular/core';
import { TodoService } from './todo.service';
import { Todo } from './todo';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit, OnDestroy{

  todos: Todo[] = [];
  displayAddEditModal = false;
  selectedTodo: any = null;
  subscriptions: Subscription [] = [];
  todoSubscription: Subscription = new Subscription;

constructor(private todoService: TodoService,
  private confirmationService: ConfirmationService,
  private messageService: MessageService){}

ngOnInit(): void{
this.getTodoList();
}

getTodoList(){
 this.todoSubscription= this.todoService.getTodo().subscribe(
    response => {
      this.todos = response;
    }
  );
  this.subscriptions.push(this.todoSubscription)
}

showAddModal(){
this.displayAddEditModal = true;
this.selectedTodo = null;
}


hideAddModal(isClosed: boolean){
  this.displayAddEditModal = !isClosed;
}

saveorUpdateTodoList(newData: any){
  if(this.selectedTodo && newData.id === this.selectedTodo.id){
    const todoIndex = this.todos.findIndex(data => data.id === newData.id);
   this.todos[todoIndex]=newData;
 } else {
    this.todos.unshift(newData);
  }
  
 // this.getTodoList();
}

showEditModal(todo: Todo){
this.displayAddEditModal=true
this.selectedTodo = todo;
}

deleteTodo(todo:Todo){
 
    this.confirmationService.confirm({
        message: 'Are you sure that you want to delete this task?',
        accept: () =>{
          this.todoService.deleteTodo(todo.id).subscribe(
            response => {
             this.todos = this.todos.filter(data => data.id !== todo.id);
              this.messageService.add ({severity: 'success', summary:'Success', detail:'Deleted successfully'});
            },
            error => {
              this.messageService.add ({severity: 'error', summary:'Error', detail:error });

            }
            
          )
        }
});

}

ngOnDestroy(): void {
  this.subscriptions.forEach(sub => sub.unsubscribe());
}
}
