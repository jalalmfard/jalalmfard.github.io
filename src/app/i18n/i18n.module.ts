import { LocalizePipe } from './localization.service';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { TranslateModule } from '@ngx-translate/core';

// Legacy translate support; site translations are bundled, with no missing HTTP catalogues.
@NgModule({ declarations: [LocalizePipe], imports: [HttpClientModule, TranslateModule.forRoot()], exports: [TranslateModule, LocalizePipe] })
export class I18nModule {}
