import {Component, Input, OnInit} from '@angular/core';
import {Todo} from '../../model/todo';
import {TodoService} from '../../service/todo.service';

@Component({
  selector: 'app-todo-view',
  templateUrl: './todo-view.component.html',
  styleUrls: ['./todo-view.component.css'],
  providers: [TodoService]
})
export class TodoViewComponent implements OnInit {
  todo = new Todo();
  private parentId: number;

  constructor(private todoService: TodoService) {
  }

  ngOnInit() {
  }

  public addTodo() {
    if (this.parentId) {
      this.todo.parentId = this.parentId;
    }
    this.todoService.addTodo(this.todo);
    this.todo = new Todo();
  }

  public setParentId(event) {
    this.parentId = event.target.value;
  }

  public toggleTodo(todo) {
    // TODO create toggle Todo on the service
    // this.todoService
  }

  public removeTodo(todo: Todo) {
    this.todoService.deleteTodo(todo.id);
  }

  public get allTodosFlat() {
    return this.todoService.getAllTodosFlat();
  }
  public get allTodosHierarchy() {
    return this.todoService.getMainTodosHierarchy();
  }


  public mouseOver(t: Todo) {
    t.isHovered = true;
  }

  public mouseLeave(t: Todo) {
    t.isHovered = false;
  }
}
