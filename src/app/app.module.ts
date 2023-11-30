import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { I18nModule } from './i18n/i18n.module';
import { SelectLanguageComponent } from './select-language/select-language.component';
import { ImageSliderModule } from './imageSlider/imageSlider.module';
 
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SelectLanguageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    I18nModule,
    ImageSliderModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class AppModule { }
