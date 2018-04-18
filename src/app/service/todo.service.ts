import {Injectable} from '@angular/core';
import {Todo} from '../model/todo';

@Injectable()
export class TodoService {
  lastId: number;

  todos = [
    {
      id: 1,
      complete: false,
      title: 'First Todo'
    } as Todo,
    {
      id: 2,
      complete: false,
      title: 'Second main Todo'
    } as Todo,
    {
      id: 3,
      complete: false,
      title: 'Third main Todo',
      children: [{id: 55, complete: false, title: 'Child of the Third Todo'} as Todo]
    } as Todo
  ];

  constructor() {
    this.lastId = 0;
  }

  public addTodo(todo: Todo) {
    if (!todo.id || todo.id < 0) {
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
    console.log(this.todos);
    const todo = this.getTodo(id);
    if (todo) {
      todo.complete = !todo.complete;
    }
  }
}
