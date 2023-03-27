import { ROUTE } from "@constants/route";

interface ISubject {
  subscribe(observer: IObserver | IModalObserver): void;
  unsubscribe(observer: IObserver | IModalObserver): void;
  notify(): void;
}

interface IObserver {
  update(): void;
}

class LogoutObserver implements ISubject {
  private observers: IObserver[] = [];
  subscribe(obs: IObserver) {
    this.observers.push(obs);
  }
  unsubscribe(obs: IObserver) {
    this.observers = this.observers.filter((fn) => {
      return fn !== obs;
    });
  }
  notify() {
    this.observers.forEach((obs: IObserver) => {
      obs.update();
    });
  }
}

class LogoutHandler implements IObserver {
  private subject: ISubject;

  constructor(logoutSubject: ISubject) {
    this.subject = logoutSubject;
    logoutSubject.subscribe(this);
  }

  public update() {
    // browserHistory.push(ROUTE.SIGN_IN);
  }
}

interface IModalObserver {
  (): void;
}

class Observer implements ISubject {
  private observers: IModalObserver[] = [];
  subscribe(obs: IModalObserver) {
    this.observers.push(obs);
  }
  unsubscribe(obs: IModalObserver) {
    this.observers = this.observers.filter((fn: IModalObserver) => {
      return fn !== obs;
    });
  }
  notify() {
    this.observers.forEach((obs: IModalObserver) => {
      obs();
    });
  }
}

export const fetchEmployeesCvObserver = new Observer();
export const logoutObserver = new LogoutObserver();
