import { Pipe, PipeTransform } from '@angular/core';
import {LanguageService} from "../services/language.service";
import {async} from "rxjs/internal/scheduler/async";

@Pipe({
  name: 'language',
})
export class LanguagePipe implements PipeTransform {

  constructor(
    public language: LanguageService,
  ) {
  }

  transform(value: any, loc: string): any {
    return value[loc];
  }

}
