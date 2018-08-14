import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {Todo} from '../../model/todo';
import {FirebaseService} from '../../services/firebase.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {

  @Input()
  todo: Todo;
  @Input()
  isHovered = false;
  @ViewChild('checkbox')
  private checkbox;

  constructor(private firebaseService: FirebaseService) {
  }

  ngOnInit() {
  }

  public deleteTodo() {
    this.firebaseService.deleteTodo(this.todo.title);
  }

  public completeTodo() {
    this.firebaseService.completeTodo(this.todo.title);
  }
}
