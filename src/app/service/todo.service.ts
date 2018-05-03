import {Injectable} from '@angular/core';
import {Todo} from '../model/todo';
import {AngularFireAuth} from 'angularfire2/auth';
import {AngularFireDatabase, AngularFireList} from 'angularfire2/database';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class TodoService {
  lastId = 0;
  allTodos: Array<Todo> = [];
  todosAsObservable: Observable<Todo[]>;
  firebaseList: AngularFireList<any>;
  todos: Array<Todo> = [];

  constructor(public databaseFB: AngularFireDatabase) {
    this.firebaseList = databaseFB.list('/');
    this.todosAsObservable = this.firebaseList.valueChanges();
    this.todosAsObservable
      .subscribe(values => this.todos = values);
  }

  public addTodo(todo: Todo) {
    if (!todo.id || todo.id < 0) {
      todo.id = this.generateId();
    }
    if (todo.parentId && todo.parentId.toString() !== 'undefined') {
      this.addChild(todo);
    } else {
      this.firebaseList.push(todo);
    }
  }

  private generateId() {
    return Math.max(...this.todos.map(t => t.id)) + 1;
  }

  private addChild(todo: Todo) {
    this.allTodos.forEach(
      (t: Todo) => {
        if (todo.parentId.toString() === t.id.toString()) {
          if (!t.children) {
            t.children = [];
          }
          t.children.push(todo);
        }
      });
  }

  public deleteTodo(id: number): boolean {
    this.todos.forEach((todo, index) => {
      if (todo.id === id) {
        this.todos.splice(index, 1);
        return true;
      }
    });
    return false;
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

  completeTodo(id: number) {
    const todo = this.getTodo(id);
    if (todo) {
      todo.complete = !todo.complete;
      if (todo.children) {
        todo.children
          .forEach(child => this.completeTodo(child.id));
      }
    }
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
