import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { I18nModule } from './i18n/i18n.module';
import { SelectLanguageComponent } from './select-language/select-language.component';
import { ImageSliderModule } from './imageSlider/imageSlider.module';
import { ArchitectureComponent } from './architecture/architecture.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoadingInterceptor } from './loading.interceptor';
import { LightboxModule } from 'ngx-lightbox';
import { ArchitectureDetailComponent } from './architecture/architecturedetail/architecturedetail.component';
 
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SelectLanguageComponent,
    ArchitectureComponent,
    SpinnerComponent,
    ArchitectureDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    I18nModule,
    ImageSliderModule,
    LightboxModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true
  }],
  bootstrap: [AppComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class AppModule { }
