import {Injectable} from '@angular/core';
import {Todo} from '../model/todo';

@Injectable()
export class TodoService {
  lastId = 0;

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
      children: [{id: 200, complete: false, title: 'Child of the Third Todo'} as Todo]
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
    this.todos.forEach(
      (t: Todo) => {
        if (todo.parentId.toString() === t.id.toString()) {
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
    return this.todos.filter(todo => todo.id === id).pop();
  }

  public getAllTodos(): Todo[] {
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
      todo.children.forEach(child => child.complete = !child.complete);
    }
  }
}
