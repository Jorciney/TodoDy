import {Injectable} from '@angular/core';
import {Todo} from '../model/todo';

@Injectable()
export class TodoService {
  lastId = 0;
  allTodos: Array<Todo> = [];

  todos = [
    {
      id: 101,
      complete: false,
      title: 'First Todo',
      children: []
    } as Todo,
    {
      id: 102,
      complete: false,
      title: 'Second main Todo',
      children: []
    } as Todo,
    {
      id: 103,
      complete: false,
      title: 'Third main Todo',
      children: [{
        id: 200,
        complete: false,
        title: 'Child of the Third Todo',
        children: [{id: 201, complete: false, title: 'GrandChild of the Third Todo'} as Todo]
      } as Todo]
    } as Todo
  ];

  constructor() {
  }

  public addTodo(todo: Todo) {
    if (!todo.id || todo.id < 0) {
      todo.id = ++this.lastId;
    }
    if (todo.parentId && todo.parentId.toString() !== 'undefined') {
      this.addChild(todo);
    } else {
      this.todos.push(todo);
    }
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
