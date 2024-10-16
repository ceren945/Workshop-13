import { FormsModule } from '@angular/forms';
import { TodoCardComponent } from './../todo-card/todo-card.component';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { GetToDoListResponse } from '../../models/getToDoListResponse';
import { ToDoRequest } from '../../models/toDoRequest';

@Component({
  selector: 'app-todo',
  imports: [FormsModule,CommonModule, TodoCardComponent],
  standalone: true,
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
})
export class TodoComponent implements OnInit {
  newTodo: ToDoRequest = { userId: 1, title: '', completed: false }; 
  todos: GetToDoListResponse[] = [];

  constructor(private httpClient: HttpClient) {}

  ngOnInit() {
    this.fetchTodos();
  }

  
  add(): void {
    if (this.newTodo.title.trim().length > 0) {
      this.httpClient.post<GetToDoListResponse>('https://jsonplaceholder.typicode.com/todos', this.newTodo)
        .subscribe({
          next: (todo) => {
            this.todos.push(todo);
            this.newTodo.title = ''; 
          },
          error: (err) => {
            console.error('Hata:', err);
          }
        });
    }
  }

 
  remove(todo: GetToDoListResponse): void {
    this.httpClient.delete<void>(`https://jsonplaceholder.typicode.com/todos/${todo.id}`)
      .subscribe({
        next: () => {
          this.todos = this.todos.filter(i => i.id !== todo.id);
        },
        error: (err) => {
          console.error('Hata:', err);
        }
      });
  }


  fetchTodos() {
    this.httpClient.get<GetToDoListResponse[]>('https://jsonplaceholder.typicode.com/todos')
      .subscribe({
        next: (response) => {
          this.todos = response;
        },
        error: (err) => {
          console.log('HATA', err);
        }
      });
  }
}
