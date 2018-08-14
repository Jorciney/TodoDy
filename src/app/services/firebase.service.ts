import {Injectable} from '@angular/core';
import {AngularFireDatabase, AngularFireList} from 'angularfire2/database';
import {takeUntil} from 'rxjs/operators';
import {Todo} from '../model/todo';
import {Observable} from 'rxjs/internal/Observable';
import 'rxjs-compat/add/operator/max';
import {Subject} from 'rxjs/Subject';
import {AngularFireAuth} from 'angularfire2/auth';

@Injectable()
export class FirebaseService {
  private todosKeyValues: Map<string, Todo> = new Map();
  allTodos: Observable<Array<any>>;
  private firebaseList: AngularFireList<any>;
  stopSubscription: Subject<boolean> = new Subject<boolean>();
  private userId: string;
  private PATH_ROOT = '/';

  constructor(private databaseFB: AngularFireDatabase, private authFirebaseService: AngularFireAuth) {
    this.fetchKeyValues();
    this.fetchUserId();
    this.firebaseList = this.databaseFB.list(this.PATH_ROOT);
  }

  public getAllTodosFromDB(): Observable<Array<any>> {
    return this.allTodos = this.databaseFB.list(this.PATH_ROOT).valueChanges();
  }

  public addTodo(todo: Todo): void {
    this.firebaseList.push(todo);
  }

  public deleteTodo(title: string): void {
    this.firebaseList.snapshotChanges().pipe(takeUntil(this.stopSubscription)).subscribe(
      value => {
        value.forEach(todo => {
          if (todo.payload.val().title === title) {
            this.databaseFB.object(this.PATH_ROOT + todo.payload.key).remove();
          }
        });
        this.stopSubscription.next(true);
      }
    );
  }

  public completeTodo(title: string) {
    this.firebaseList.snapshotChanges().pipe(takeUntil(this.stopSubscription)).subscribe(
      value => {
        value.forEach(todo => {
          if (todo.payload.val().title === title) {
            const updatedTodo = todo.payload.val();
            updatedTodo.complete = !updatedTodo.complete;
            this.databaseFB.object(this.PATH_ROOT + todo.payload.key).update(updatedTodo);
          }
        });
        this.stopSubscription.next(true);
      }
    );
  }

  getTodo(title: string): any {
    const foundEntry = this.databaseFB.list(this.PATH_ROOT, ref => ref.orderByChild('title').equalTo(title));
    return foundEntry ? foundEntry[0] : undefined;
  }

  private fetchUserId() {
    this.authFirebaseService.authState.subscribe(user => {
      if (user) {
        this.userId = user.uid;
        this.PATH_ROOT = `todos/${user.uid}/`;
      } else {
        this.PATH_ROOT = 'todos/anonymous/';
      }
      this.firebaseList = this.databaseFB.list(this.PATH_ROOT);
      this.getAllTodosFromDB();
    });
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

}
