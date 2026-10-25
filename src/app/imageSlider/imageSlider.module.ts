import { I18nModule } from '../i18n/i18n.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ImageSliderComponent } from './components/imageSlider/imageSlider.component';

@NgModule({
  imports: [CommonModule, I18nModule],
  exports: [ImageSliderComponent],
  declarations: [ImageSliderComponent],
})
export class ImageSliderModule {}
