import {Injectable} from '@angular/core';
import {Todo} from '../model/todo';
import {AngularFireDatabase, AngularFireList} from 'angularfire2/database';
import {Observable} from 'rxjs/Observable';
import {FirebaseService} from './firebase.service';

@Injectable()
export class TodoService {
  allTodos: Array<Todo> = [];
  allFlatTodos = [];
  todosKeyValues = [];
  todosAsObservable: Observable<Todo[]>;
  firebaseList: AngularFireList<any>;
  todos: Array<Todo> = [];
  todosWithHierarchy: Array<Todo> = [];

  constructor(public databaseFB: AngularFireDatabase,  private firebaseService: FirebaseService) {
    databaseFB.list('/').snapshotChanges().map(actions => {
      return actions.map(a => {
        const data = a.payload.val();
        const id = a.payload.key;
        this.todosKeyValues[id] = data;
        return {id, ...data};
      });
    }).subscribe(values => console.log(this.todosKeyValues));
    this.firebaseList = databaseFB.list('/');
    this.todosAsObservable = this.firebaseList.valueChanges();
    this.todosAsObservable
      .subscribe(values => this.todos = values);
  }

  public addTodo(todo: Todo) {
   this.firebaseService.addTodo(todo);
  }

  private generateId() {
    return Math.max(...this.todos.map(t => t.id)) + 1;
  }


  public deleteTodo(id: number): void {
    this.firebaseService.deleteTodo(id);
  }

  public getTodo(id: number): Todo {
    let result = null;
    this.allTodos.forEach(todo => {
      if (todo.id === id) {
        result = todo;
      }
      if (todo.children) {
        todo.children.forEach(child => {
            if (child.id === id) {
              result = child;
            }
          }
        );
      }
    });
    return result;
  }

  public getAllTodosFlat(): Todo[] {
    this.allTodos = [];
    this.fetchAllTodos(this.todos);
    return this.allTodos;
  }

  public getMainTodosHierarchy(): Todo[] {
    return this.todos;
  }


  public updateTodoById(id: number, values: Object = {}): Todo {
    const todo = this.getTodo(id);
    if (!todo) {
      return null;
    }
    Object.assign(todo, values);
    return todo;
  }

  public isTodoAlreadyAdded(id: number): boolean {
    this.todos.forEach(todo => {
      if (todo.id === id) {
        return true;
      }
    });
    return false;
  }

  public completeTodo(id: number) {
    this.firebaseService.completeTodo(id);
  }

  private fetchAllTodos(todos: Todo[]) {
    todos.forEach(todo => {
        this.allTodos.push(todo);
        if (todo.children) {
          this.fetchAllTodos(todo.children);
        }
      }
    );
  }
}
