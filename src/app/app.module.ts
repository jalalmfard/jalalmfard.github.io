import { CUSTOM_ELEMENTS_SCHEMA, NgModule, isDevMode } from '@angular/core';
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
import { ArtworksComponent } from './artworks/artworks.component';
import { ArtworksDetailComponent } from './artworks/artworksdetail/artworksdetail.component';
import { ExhibitionsComponent } from './exhibitions/exhibitions.component';
import { CommonModule } from '@angular/common';
import { ExhibitionsDetailComponent } from './exhibitions/exhibitionsdetail/exhibitionsdetail.component';
import { FurnituredesignComponent } from './furnituredesign/furnituredesign.component';
import { furnituredesignDetailComponent } from './furnituredesign/furnituredesigndetail/furnituredesigndetail.component';
import { ArtreviewsDetailComponent } from './artreviews/artreviewsdetail/artreviewsdetail.component';
import { ArtreviewsComponent } from './artreviews/artreviews.component';
import { PosterComponent } from './poster/poster.component';
import { posterDetailComponent } from './poster/posterdetail/posterdetail.component';
import { LogoComponent } from './logo/logo.component';
import { logoDetailComponent } from './logo/logodetail/logodetail.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { AboutComponent } from './about/about.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SelectLanguageComponent,
    ArchitectureComponent,
    SpinnerComponent,
    ArchitectureDetailComponent,
    ArtworksComponent,
    ArtworksDetailComponent,
    ExhibitionsComponent,
    ExhibitionsDetailComponent,
    FurnituredesignComponent,
    furnituredesignDetailComponent,
    ArtreviewsComponent,
    ArtreviewsDetailComponent,
    PosterComponent,
    posterDetailComponent,
    LogoComponent,
    logoDetailComponent,
    AboutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    I18nModule,
    ImageSliderModule,
    LightboxModule,
    CommonModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    })
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
