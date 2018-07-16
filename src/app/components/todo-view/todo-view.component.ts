import {Component, OnInit} from '@angular/core';
import {Todo} from '../../model/todo';
import {TodoService} from '../../service/todo.service';
import {AngularFireAuth} from 'angularfire2/auth';
import {AngularFireList} from 'angularfire2/database';
import * as firebase from 'firebase';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-todo-view',
  templateUrl: './todo-view.component.html',
  styleUrls: ['./todo-view.component.css'],
  providers: [TodoService]
})
export class TodoViewComponent implements OnInit {
  todo = new Todo();
  user: Observable<firebase.User>;
  list: AngularFireList<any>;

  private parentId: any;

  constructor(private todoService: TodoService, private authenticatorFB: AngularFireAuth) {
  }

  ngOnInit() {
  }

  login() {
    this.authenticatorFB.auth.signInAnonymously();
  }

  logout() {
    this.authenticatorFB.auth.signOut();
  }

  send(desc: string) {
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
