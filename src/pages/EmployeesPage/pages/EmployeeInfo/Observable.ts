export class Observable {
  observers: (() => void)[];

  constructor() {
    this.observers = [];
  }

  notify() {
    this.observers.forEach((observer) => observer());
  }

  subscribe(...functions: (() => void)[]) {
    this.observers.push(...functions);
  }

  unsubscribe(...functions: (() => void)[]) {
    functions.forEach((fn) => {
      this.observers = this.observers.filter((observer) => observer !== fn);
    });
  }
}
