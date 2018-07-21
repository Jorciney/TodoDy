import {Component, OnDestroy, OnInit} from '@angular/core';
import {Todo} from '../../model/todo';
import {AngularFireAuth} from 'angularfire2/auth';
import {AngularFireList} from 'angularfire2/database';
import * as firebase from 'firebase';
import {Observable} from 'rxjs/internal/Observable';
import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs/Subject';
import {FirebaseService} from '../../service/firebase.service';

@Component({
  selector: 'app-todo-view',
  templateUrl: './todo-view.component.html',
  styleUrls: ['./todo-view.component.css'],
})
export class TodoViewComponent implements OnInit, OnDestroy {
  todo = new Todo();
  user: Observable<firebase.User>;
  list: AngularFireList<any>;
  allTodos: Array<Todo> = [];
  stopSubscription: Subject<boolean> = new Subject<boolean>();
  private parentId: any;

  constructor(private authenticatorFB: AngularFireAuth, private firebaseService: FirebaseService) {
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
    this.firebaseService.addTodo(this.todo);
    this.todo = new Todo();
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
    this.firebaseService.getAllTodosFromDB()
      .pipe(takeUntil(this.stopSubscription)).subscribe(todos => {
        this.allTodos = todos;
      }
    );
  }

}
