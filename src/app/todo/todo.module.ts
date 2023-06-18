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


@NgModule({
  declarations: [
    TodoComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    TableModule,
    ButtonModule,
    ToastModule,
    AddEditTodoModule,
    ConfirmDialogModule,
   


  ],
  exports: [
    TodoComponent
  ],
  providers:[
    MessageService,  ConfirmationService
  ]
})
export class TodoModule { }
