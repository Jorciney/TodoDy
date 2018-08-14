import {Component, OnDestroy, OnInit} from '@angular/core';
import {Todo} from '../../model/todo';
import {AngularFireList} from 'angularfire2/database';
import {Subject} from 'rxjs/Subject';
import {FirebaseService} from '../../services/firebase.service';
import {AuthenticationService} from '../../services/authentication.service';

@Component({
  selector: 'app-todo-view',
  templateUrl: './todo-view.component.html',
  styleUrls: ['./todo-view.component.css'],
})
export class TodoViewComponent implements OnInit, OnDestroy {
  todo = new Todo();
  list: AngularFireList<any>;
  allTodos: Array<Todo> = [];
  stopSubscription: Subject<boolean> = new Subject<boolean>();

  constructor(public firebaseService: FirebaseService, public authenticationService: AuthenticationService) {
  }

  ngOnInit() {
  }

  public addTodo() {
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


}
