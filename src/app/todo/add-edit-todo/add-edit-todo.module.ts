import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddEditTodoComponent } from './add-edit-todo.component';
import { DialogModule } from 'primeng/dialog';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { ButtonModule } from 'primeng/button';
import { ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { RadioButtonModule } from 'primeng/radiobutton';

@NgModule({
  declarations: [
    AddEditTodoComponent
  ],
  imports: [
    CommonModule,
    DialogModule,
    BrowserAnimationsModule,
    ButtonModule,
    ReactiveFormsModule,
    InputTextModule,
    InputNumberModule,
    RadioButtonModule
   
  ],
  exports: [AddEditTodoComponent]
})
export class AddEditTodoModule { }
