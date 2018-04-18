import {Component, Input, OnInit} from '@angular/core';
import {Todo} from '../model/todo';
import {TodoService} from '../service/todo.service';

@Component({
  selector: 'app-todo-tab',
  templateUrl: './todo-tab.component.html',
  styleUrls: ['./todo-tab.component.css'],
  providers: [TodoService]
})
export class TodoTabComponent implements OnInit {
  todo = new Todo();

  constructor(private todoService: TodoService) {
  }

  ngOnInit() {
  }

  public addTodo() {
    this.todoService.addTodo(this.todo);
    this.todo = new Todo();
  }

  public toggleTodo(todo) {
    // TODO create toggle Todo on the service
    // this.todoService
  }

  public removeTodo(todo: Todo) {
    this.todoService.deleteTodo(todo.id);
  }

  public get todos() {
    return this.todoService.getAllTodos();
  }

  public mouseOver(t: Todo) {
    t.isHovered = true;
  }

  public mouseLeave(t: Todo) {
    t.isHovered = false;
  }
}
