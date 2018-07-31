import {Injectable} from '@angular/core';
import {AngularFireDatabase, AngularFireList} from 'angularfire2/database';
import {takeUntil} from 'rxjs/operators';
import {Todo} from '../model/todo';
import {Observable} from 'rxjs/internal/Observable';
import 'rxjs-compat/add/operator/max';
import {Subject} from 'rxjs/Subject';

@Injectable()
export class FirebaseService {
  todosKeyValues: Map<string, Todo> = new Map();
  allTodos: Observable<Array<any>>;
  private firebaseList: AngularFireList<any>;
  stopSubscription: Subject<boolean> = new Subject<boolean>();

  constructor(private databaseFB: AngularFireDatabase) {
    this.fetchKeyValues();
    this.firebaseList = this.databaseFB.list('/');
  }

  public getAllTodosFromDB(): Observable<Array<any>> {
    if (this.allTodos) {
      return this.allTodos;
    }
    return this.allTodos = this.databaseFB.list('/').valueChanges();
  }

  public addTodo(todo: Todo): void {
    if (!todo.id || todo.id < 0) {
      todo.id = this.generateId();
    }
    this.databaseFB.list('/').push(todo);
  }

  public deleteTodo(id: number): void {
    this.databaseFB.list('/').snapshotChanges().pipe(takeUntil(this.stopSubscription)).subscribe(
      value => {
        value.forEach(todo => {
          if (todo.payload.val().id === id) {
            this.databaseFB.object('/' + todo.payload.key).remove();
          }
        });
        this.stopSubscription.next(true);
      }
    );
  }

  public completeTodo(id: number) {
    const foundTodo = this.getTodo(id);
    if (foundTodo) {
      const updatedTodo = foundTodo;
      updatedTodo.complete = !updatedTodo.complete;
      this.databaseFB.object('/' + this.getKey(id)).update(updatedTodo);
    }
  }

  getKey(id: number): string {
    const foundEntry = Array.from(this.todosKeyValues.entries()).filter(entry => entry[1].id === id).pop();
    return foundEntry ? foundEntry[0] : undefined;
  }

  getTodo(id: number): Todo {
    const foundEntry = Array.from(this.todosKeyValues.entries()).filter(entry => entry[1].id === id).pop();
    return foundEntry ? foundEntry[1] : undefined;
  }

  private fetchKeyValues() {
    this.databaseFB.list('/').snapshotChanges().subscribe(actions => {
      actions.forEach(action => {
        const value = action.payload.val();
        const id = action.payload.key;
        this.todosKeyValues.set(id, value);
      });
    });
  }

  private generateId() {
    let id = -1;
    const values = this.todosKeyValues.values();
    id = Math.max.apply(Math, Array.from(values).map(todo => todo.id)) + 1;
    return id;
  }
}
