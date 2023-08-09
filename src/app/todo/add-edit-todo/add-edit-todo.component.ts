import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TodoService } from '../todo.service';
import {MessageService} from 'primeng/api';

@Component({
  selector: 'app-add-edit-todo',
  templateUrl: './add-edit-todo.component.html',
  styleUrls: ['./add-edit-todo.component.css']
})
export class AddEditTodoComponent implements OnInit, OnChanges{
  @Input () displayAddEditModal: boolean=true;
  @Input () selectedTodo: any =null;
  @Output() clickClose: EventEmitter<void> = new EventEmitter<void>();
  @Output() clickAddEdit: EventEmitter<any> = new EventEmitter();
  modalType = "Add";

  closeModal(): void {
    this.clickClose.emit();
    this.todoForm.reset();
  }
  
public todoForm = new FormGroup({
todo: new FormControl ('',[ Validators.required, Validators.minLength(1)]),
  whattimeisit:  new FormControl ('', Validators.required),
  statuss: new FormControl ,
});
  constructor(private fb : FormBuilder, private todoService: TodoService, private messageService: MessageService){}
  ngOnInit():void{

  }

  ngOnChanges(): void {
    if(this.selectedTodo){
      this.modalType = 'Edit';
      this.todoForm.patchValue(this.selectedTodo)
    } else{
      this.todoForm.reset();
      this.modalType = 'Add';
    }
  }

  addEditTask(){
    
    this.todoService.addEditTask(this.todoForm.value, this.selectedTodo).subscribe(
      response =>{
        this.clickAddEdit.emit(response);
        this.closeModal();
        const msg = this.modalType === 'Add' ? 'Task added' : 'Task updated' ;
        this.messageService.add ({ severity: "success", summary:"Seuccess", detail: msg});
      },
        error =>  {
          this.messageService.add ({ severity: "error", summary:"Error", detail:error});
     console.log('Error occured');
      
     }

    )
  }

}
