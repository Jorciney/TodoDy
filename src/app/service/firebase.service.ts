import {Injectable} from '@angular/core';
import {AngularFireDatabase} from 'angularfire2/database';
import {map, mergeMap} from 'rxjs/operators';
import {Todo} from '../model/todo';
import {Observable} from 'rxjs/internal/Observable';

@Injectable()
export class FirebaseService {
  todosKeyValues: Observable<any>;
  allTodos: Observable<Array<any>>;

  constructor(private databaseFB: AngularFireDatabase) {
    this.fetchKeyValues();
  }

  public getAllTodosFromDB(): Observable<Array<any>> {
    if (this.allTodos) {
      return this.allTodos;
    }
    return this.allTodos = this.databaseFB.list('/').valueChanges();
  }

  public getTodo(id: number): Observable<Todo> {
    return this.getAllTodosFromDB().pipe(mergeMap(tdos => tdos.filter(todo => todo.id === id).pop()));
  }

  public addTodo(todo: Todo): void {
    if (!todo.id || todo.id < 0) {
      todo.id = this.generateId();
    }
    this.databaseFB.list('/').push(todo);
  }

  public deleteTodo(id: number): void {
    this.databaseFB.list('/').snapshotChanges().subscribe(
      value => value.forEach(todo => {
        if (todo.payload.val().id === id) {
          this.databaseFB.object('/' + todo.payload.key).remove();
        }
      })
    );
  }

  public completeTodo(id: number) {
    this.databaseFB.list('/').snapshotChanges().subscribe(
      value => value.forEach(todo => {
        if (todo.payload.val().id === id) {
          const updatedTodo = todo.payload.val();
          updatedTodo.complete = !updatedTodo.complete;
          this.databaseFB.object('/' + todo.payload.key).update(updatedTodo);
        }
      })
    );
  }

  private fetchKeyValues() {
    this.todosKeyValues = this.databaseFB.list('/').snapshotChanges()
      .pipe(
        map((actions: Observable<any>) => actions.pipe(map(action => {
          const value = action.payload.value();
          const id = action.payload.key;
          return {id, ...value};
        })))
      );
  }

  private generateId() {
    let id = -1;
    this.getAllTodosFromDB().pipe(
      map(tdos => id = Math.max(...tdos.map(t => t.id)) + 1)
    );
    return id;
  }

  private updateTodo(snapshot, todo: any): void {
    this.databaseFB.object('/' + snapshot.payload.key).update(todo);
  }
}
