import {NgModule} from "@angular/core";
import {LanguagePipe} from "./pipes/language.pipe";

@NgModule({
  declarations: [
    LanguagePipe
  ],
  exports: [
    LanguagePipe
  ]
})
export class SharedModule {

}
