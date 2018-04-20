import {AfterViewInit, Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {Todo} from '../../model/todo';
import {TodoService} from '../../service/todo.service';

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

  constructor(private todoService: TodoService) {
  }

  ngOnInit() {
  }

  public deleteTodo() {
    this.todoService.deleteTodo(this.todo.id);
  }

  public completeTodo() {
    this.todoService.completeTodo(this.todo.id);
  }
}
