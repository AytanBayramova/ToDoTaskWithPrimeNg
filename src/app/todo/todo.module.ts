import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoComponent } from './todo.component';
import {HttpClientModule} from "@angular/common/http";
import {TableModule} from "primeng/table"
import { AddEditTodoModule } from './add-edit-todo/add-edit-todo.module';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import {MessageService} from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import {ConfirmationService} from 'primeng/api'
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { TreeTableModule } from 'primeng/treetable';
import { InputTextModule } from 'primeng/inputtext'; // Import InputTextModule
import { PaginatorModule } from 'primeng/paginator';
import { RadioButtonModule } from 'primeng/radiobutton';
@NgModule({
  declarations: [
    TodoComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    TableModule,
    ButtonModule,
    FormsModule,
    ToastModule,
    AddEditTodoModule,
    ConfirmDialogModule,
    DropdownModule,
    TreeTableModule,
    InputTextModule,
    PaginatorModule,
    RadioButtonModule
 
   


  ],
  exports: [
    TodoComponent
  ],
  providers:[
    MessageService,  ConfirmationService
  ]
})
export class TodoModule { }
