import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import * as am from '../../assets/i18n/am.json';
import * as en from '../../assets/i18n/en.json';
import {TranslateService} from "@ngx-translate/core";

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  selected_language = {
    loc: 'am',
    icon: '../assets/images/icons/armenia.png',
    name: 'Հայերեն'
  };
  languages = [
    {
      loc: 'am',
      icon: '../assets/images/icons/armenia.png',
      name: 'Հայերեն'
    },
    {
      loc: 'en',
      icon: '../assets/images/icons/united-kingdom.png',
      name: 'English'
    },
    {
      loc: 'ru',
      icon: '../assets/images/icons/russia.png',
      name: 'Русский'
    }
  ];

  constructor(
    private http      : HttpClient,
    private translate : TranslateService
) {
    this.selectedLanguage();
    translate.setDefaultLang(this.selected_language.loc);
  }

  changeLanguage(lang: string, index: number) {
    this.translate.use(lang);
    this.selected_language = this.languages[index];
    localStorage.setItem('selected_language', JSON.stringify(this.selected_language));
  }

  selectedLanguage() {
    this.selected_language = localStorage.getItem('selected_language') ? JSON.parse(
      localStorage.getItem('selected_language')) : this.languages[0];
  }
}
