import {
  getLanguageFromLocalStorage,
  saveLanguageToLocalStorage,
} from "@src/helpers/localStorage";
import { makeAutoObservable } from "mobx";
import { AppLanguage } from "./LanguageStore.types";

export class LanguageStore {
  language$: AppLanguage = "EN";

  constructor() {
    this.restoreLanguage();

    makeAutoObservable(this, { restoreLanguage: false }, { autoBind: true });
  }

  setLanguage(language: AppLanguage) {
    this.language$ = language;
    saveLanguageToLocalStorage(language);
  }

  restoreLanguage() {
    const language = getLanguageFromLocalStorage();

    if (language) {
      this.language$ = language;
    }
  }
}

export const languageStore = new LanguageStore();
