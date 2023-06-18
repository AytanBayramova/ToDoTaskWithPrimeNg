import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
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
  @Output() clickClose: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() clickAddEdit: EventEmitter<any> = new EventEmitter<any>();
  modalType = "Add";

todoForm = this.fb.group({
todo: ["", Validators.required],
  whattimeisit:["",Validators.required],
  editordelete: ["", Validators.required]
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

  closeModal(){
    this.clickClose.emit(true);
    this.todoForm.reset();
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
