import {Injectable} from '@angular/core';
import {Todo} from '../model/todo';

@Injectable()
export class TodoService {
  lastId: 0;

  todos: Todo[];

  constructor() {
  }

  public addTodo(todo: Todo) {
    if (todo && !todo.id) {
      todo.id = ++this.lastId;
    }
    this.todos.push(todo);
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
    let todo = this.getTodo(id);
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
}
