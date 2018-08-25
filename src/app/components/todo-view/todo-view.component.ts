import {Component, OnDestroy, OnInit} from '@angular/core';
import {Todo} from '../../model/todo';
import {Subject} from 'rxjs/Subject';
import {FirebaseService} from '../../services/firebase.service';
import {AuthenticationService} from '../../services/authentication.service';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-todo-view',
  templateUrl: './todo-view.component.html',
  styleUrls: ['./todo-view.component.css'],
})
export class TodoViewComponent implements OnInit, OnDestroy {
  todo = new Todo();
  stopSubscription: Subject<boolean> = new Subject<boolean>();
  date = new Date();
  isDateSelected: boolean;

  constructor(public firebaseService: FirebaseService,
              public authenticationService: AuthenticationService,
              private datePipe: DatePipe
  ) {
  }

  ngOnInit() {
  }

  public addTodo() {
    if (this.isDateSelected) {
      this.todo.date = this.datePipe.transform(this.date, 'dd-MM-yyy');
    }
    if (this.isTodoValid()) {
      this.firebaseService.addTodo(this.todo);
      this.todo = new Todo();
      this.isDateSelected = false;
    }
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

  selectDate(): void {
    this.isDateSelected = true;
  }

  private isTodoValid(): boolean {
    return !!(this.todo && this.todo.title);
  }
}
