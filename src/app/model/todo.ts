export class Todo {
  id: number;
  title: string;
  complete = false;
  children: Todo[];
  action: string;

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }

  public addChildren(child: Todo) {
    this.children.push();
  }
}
