import { FormsModule } from '@angular/forms';
import{CommonModule} from'@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-todo',
  imports:[CommonModule, FormsModule],
  standalone:true,
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent {
  newTodo: string = '';
  todos: string[] = [];

  addTodo(form: any): void {
    const todoTrimmed = this.newTodo.trim();

  
    if (todoTrimmed && !this.todos.includes(todoTrimmed)) {
      this.todos.push(todoTrimmed);
      this.newTodo = '';
      form.resetForm(); 
    } else {
      this.newTodo = ''; 
      form.resetForm(); 
    }
  }

  removeTodo(index: number): void {
    this.todos.splice(index, 1);
  }
}

