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
  actions: any[] =[] ;
  selectedAction: { [key: number]: string } = {};
  selectedTodo: Todo | null = null;
  searchQuery: string = '';
  filteredTodos: Todo[] = []; // Add a new array to store the filtered todos
  selectedStatus: string = 'todo'; // Set the default status as 'todo'



  sortField: string = 'todo';
  sortOrder: number = 1;



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

}

onActionChange(action: string, todo: Todo) {
  this.selectedAction[todo.id] = action;

  if (action === 'edit') {
    this.showEditModal(todo);
  } else if (action === 'delete') {
    this.deleteTodo(todo);
  }
  const savedStatus = localStorage.getItem('selectedStatus');
    if (savedStatus) {
      this.selectedStatus = savedStatus;
    }
 
}

totalRecords: number = 0;


 getTodoList() {
    this.todoSubscription = this.todoService.getTodo().subscribe((response) => {
      this.todos = response;
      this.filteredTodos = this.filterTodos(); // Initially, filteredTodos will have all todos
      this.totalRecords = this.filteredTodos.length; // Set the totalRecords to the length of filteredTodos
      this.updateDataTable();
    });
    this.subscriptions.push(this.todoSubscription);

  }

onSearch(event: Event): void {
  const searchValue = (event.target as HTMLInputElement).value;
  this.searchQuery = searchValue.trim().toLowerCase(); // Convert to lowercase for case-insensitive search
  if (this.searchQuery) {
    // If there's a search query, filter the todos based on the task name
    this.filteredTodos = this.todos.filter(
      (todo) => todo.todo.toLowerCase().includes(this.searchQuery)
    );
  } else {
    // If search query is empty, show all todos
    this.filteredTodos = [...this.todos];
  }
  this.totalRecords = this.filteredTodos.length; // Set the totalRecords to the length of filteredTodos
  this.updateDataTable(); // Update the dataTable with the filteredTodos

  if (this.dataTable) {
    this.dataTable.reset();
    this.dataTable.value = this.filteredTodos; // Assign the filteredTodos to the data table
  }
// Call the sort function after filtering

  }

  filterTodos(): Todo[] {
    if (this.searchQuery) {
      return this.todos.filter((todo) =>
        todo.todo.toLowerCase().includes(this.searchQuery)
      );
    } else {
      return this.todos;
    }
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

first: number = 0;


updateDataTable() {
  if (this.dataTable) {
    this.dataTable.reset();
    this.dataTable.value = this.filteredTodos;
    this.first = 0; // Reset the first row index to 0
  }
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
  this.subscriptions.forEach((sub) => sub.unsubscribe());
}
}
