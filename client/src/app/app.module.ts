import { BrowserModule } from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from "@angular/common/http";
import {AngularFontAwesomeModule} from "angular-font-awesome";
import { AuthComponent } from './auth/auth.component';
import { LanguagePipe } from './pipes/language.pipe';
import {ReactiveFormsModule} from "@angular/forms";
import {NgxsModule} from "@ngxs/store";
import {AuthState} from "./ngxs/states/auth.state";
import {NgxsReduxDevtoolsPluginModule} from "@ngxs/devtools-plugin";
import {NgxsLoggerPluginModule} from "@ngxs/logger-plugin";
import {environment} from "../environments/environment";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {TranslateHttpLoader} from "@ngx-translate/http-loader";
import {TokenInterceptorService} from "./services/token-interceptor.service";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {SharedModule} from "./shared.module";
import {SocketIoConfig, SocketIoModule} from "ngx-socket-io";
import {CartState} from "./ngxs/states/cart.state";
import {OrdersState} from "./ngxs/states/orders.state";
import {TablesState} from "./ngxs/states/tables.state";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

const config: SocketIoConfig = {url: environment.SOCKET_URL, options: {}};

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    AngularFontAwesomeModule,
    ReactiveFormsModule,
    SharedModule,
    NgxsModule.forRoot([
      AuthState,
      CartState,
      OrdersState,
      TablesState
    ]),
    NgxsReduxDevtoolsPluginModule.forRoot(),
    NgxsLoggerPluginModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    SocketIoModule.forRoot(config)
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    }
  ],
  exports: [
    LanguagePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
