import {Component, OnDestroy, OnInit} from '@angular/core';
import {Todo} from '../../model/todo';
import {TodoService} from '../../service/todo.service';
import {AngularFireAuth} from 'angularfire2/auth';
import {AngularFireList} from 'angularfire2/database';
import * as firebase from 'firebase';
import {Observable} from 'rxjs/internal/Observable';
import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs/Subject';

@Component({
  selector: 'app-todo-view',
  templateUrl: './todo-view.component.html',
  styleUrls: ['./todo-view.component.css'],
  providers: [TodoService]
})
export class TodoViewComponent implements OnInit, OnDestroy {
  todo = new Todo();
  user: Observable<firebase.User>;
  list: AngularFireList<any>;
  allTodos: Array<Todo> = [];
  stopSubscription: Subject<boolean> = new Subject<boolean>();
  private parentId: any;

  constructor(private todoService: TodoService, private authenticatorFB: AngularFireAuth) {
  }

  ngOnInit() {
    this.fetchTodos();
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

  public removeTodo(todo: Todo) {
    this.todoService.deleteTodo(todo.id);
  }

  public get allTodosFlat() {
    return this.todoService.getAllTodosFlat();
  }

  public mouseOver(t: Todo) {
    t.isHovered = true;
  }

  public mouseLeave(t: Todo) {
    t.isHovered = false;
  }

  ngOnDestroy(): void {
    this.stopSubscription.next(true);
  }

  private fetchTodos() {
    this.todoService.getAllTodos()
      .pipe(takeUntil(this.stopSubscription)).subscribe(todos => {
        this.allTodos = todos;
      }
    );
  }

}
