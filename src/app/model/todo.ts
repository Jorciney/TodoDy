export class Todo {
  id = -1;
  title: string;
  complete = false;
  children = [];
  action: string;
  isHovered = false;
  parentId?: number;

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }

  public addChild(child: Todo) {
    this.children.push(child);
  }
}
