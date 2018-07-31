import {Component, OnDestroy, OnInit} from '@angular/core';
import {Todo} from '../../model/todo';
import {AngularFireList} from 'angularfire2/database';
import * as firebase from 'firebase';
import {Observable} from 'rxjs/internal/Observable';
import {takeUntil} from 'rxjs/operators';
import {FirebaseService} from '../../services/firebase.service';
import {AuthenticationService} from '../../services/authentication.service';
import {of} from 'rxjs/internal/observable/of';

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
  stopSubscription = of(false);
  private parentId: any;

  constructor(private firebaseService: FirebaseService, private authenticationService: AuthenticationService) {
  }

  ngOnInit() {
    this.fetchTodos();
  }

  login() {
    this.authenticationService.signingWithGoogle();
  }

  logout() {
    this.authenticationService.logout();
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
    this.stopSubscription = of(true);
  }

  private fetchTodos() {
    this.firebaseService.getAllTodosFromDB()
      .pipe(takeUntil(this.stopSubscription)).subscribe(todos => {
        this.allTodos = todos;
      }
    );
  }

}
