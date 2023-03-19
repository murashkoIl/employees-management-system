import { ROUTE } from "@constants/route";

interface ISubject {
  subscribe(observer: IObserver): void;
  unsubscribe(observer: IObserver): void;
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

export const logoutObserver = new LogoutObserver();
const logoutHandler = new LogoutHandler(logoutObserver);
