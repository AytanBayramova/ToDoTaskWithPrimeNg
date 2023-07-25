import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { TodoService } from './todo.service';
import { Todo } from './todo';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { Dialog } from 'primeng/dialog'; // Correct import statement
import { Table } from 'primeng/table';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit, OnDestroy{
  @ViewChild('addEditDialog') dataTable!: Table;
  todos: Todo[] = [];
  actions: any[] | undefined ;
  selectedAction: any = null;
  selectedTodo: Todo | null = null;
  searchQuery: string = '';

 
  displayAddEditModal = false;
  subscriptions: Subscription [] = [];
  todoSubscription: Subscription = new Subscription;
  
constructor(private todoService: TodoService,
  private confirmationService: ConfirmationService,
  private messageService: MessageService){}

ngOnInit(): void{
this.getTodoList();
this.actions = [

  { label: 'Edit', value: 'edit', icon: 'pi pi-pencil' },
  { label: 'Delete', value: 'delete', icon: 'pi pi-trash' }
];
this.selectedAction = this.actions[0]; // Set 'Edit' as the default action

}

onActionChange(action: string, todo: Todo) {
  this.selectedAction[todo.id] = action;
  
  if (action === 'edit') {
    this.showEditModal(todo);
  } else if (action === 'delete') {
    this.deleteTodo(todo);
  }

  this.displayAddEditModal = false;
  this.selectedTodo = null;
}

getTodoList() {
  this.todoService.getTodo().subscribe((response) => {
    this.todos = response;
    this.dataTable.reset();
  });
}

onSearch(event: Event): void {
  const searchValue = (event.target as HTMLInputElement).value;
  this.searchQuery = searchValue;
  this.dataTable.filterGlobal(this.searchQuery, 'contains');
}


hideAddModal(isClosed: boolean): void {
  this.displayAddEditModal = !isClosed;
  if (!isClosed) {
    this.selectedTodo = null; // Reset selectedTodo when the modal is closed
  }
}
closeAddModal(): void {
  this.displayAddEditModal = false;
  this.selectedTodo = null;
}
saveorUpdateTodoList(newData: any) {
  if (this.selectedTodo && newData.id === this.selectedTodo.id) {
    const todoIndex = this.todos.findIndex((data) => data.id === newData.id);
    this.todos[todoIndex] = newData;
  } else {
    this.todos.unshift(newData);
  }
  this.displayAddEditModal = false;
  this.selectedTodo = null;
}


showEditModal(todo: Todo){
this.displayAddEditModal=true;
this.selectedTodo = todo;
}
showAddModal(): void {
  this.selectedTodo = null;
  this.displayAddEditModal = true;
}

onCloseModal(): void {
  this.displayAddEditModal = false;
  this.selectedTodo = null;
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
  // Unsubscribe from the todoSubscription to prevent memory leaks
  this.todoSubscription.unsubscribe();
}
}
