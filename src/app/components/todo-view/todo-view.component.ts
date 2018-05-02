import {Component, Input, OnInit} from '@angular/core';
import {Todo} from '../../model/todo';
import {TodoService} from '../../service/todo.service';
import {AngularFireAuth} from 'angularfire2/auth';
import {AngularFireDatabase, AngularFireList} from 'angularfire2/database';
import {FirebaseListObservable} from 'angularfire2/database-deprecated';
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
  todos: Observable<any[]>;
  list: AngularFireList<any>;

  private parentId: number;

  constructor(private todoService: TodoService, private authenticatorFB: AngularFireAuth, public databaseFB: AngularFireDatabase) {
      this.list = databaseFB.list('/', ref => {
      const q = ref.limitToLast(50);
      return q;
    });
    this.todos = this.list.valueChanges();
    this.todos.subscribe( value => {
      console.log('value', value);
    });
  }

  ngOnInit() {
  }

  login() {
    this.authenticatorFB.auth.signInAnonymously();
  }

  logout() {
    this.authenticatorFB.auth.signOut();
  }

  Send(desc: string) {
  }

  public addTodo() {
    if (this.parentId) {
      this.todo.parentId = this.parentId;
    }
    this.list.push({
      id: this.todo.id,
      title: this.todo.title,
      complete: this.todo.complete
    } as Todo);

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
    return this.todos;
    // return this.todoService.getAllTodosFlat();
  }

  public get allTodosHierarchy() {
    return this.todos;
  }


  public mouseOver(t: Todo) {
    t.isHovered = true;
  }

  public mouseLeave(t: Todo) {
    t.isHovered = false;
  }
}
