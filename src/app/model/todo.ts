export class Todo {
  title: string;
  complete = false;
  children ? = [];
  isHovered ? = false;

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
