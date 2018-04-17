import {Component, Input, OnInit} from '@angular/core';
import {Todo} from '../model/todo';
import {TodoService} from '../service/todo.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {
  @Input()
  todo: Todo;

  constructor(private todoService: TodoService) {
  }

  ngOnInit() {
  }

  public deleteTodo() {
    this.todoService.deleteTodo(this.todo.id);
  }

  public completeTodo() {
    this.todoService.completeTodo(this.todo.id);
  }
}
