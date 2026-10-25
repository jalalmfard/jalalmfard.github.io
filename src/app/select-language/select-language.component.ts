import { Component } from '@angular/core';
import { LocalizationService } from '../i18n/localization.service';

@Component({
  selector: 'app-select-language',
  template: `
    <select #language [value]="localization.language" (change)="localization.select(language.value)"
      aria-label="Language / زبان / اللغة" dir="ltr">
      <option value="en" lang="en">English</option>
      <option value="fa" lang="fa">فارسی</option>
      <option value="ar" lang="ar">العربية</option>
    </select>
  `,
  styles: [`:host{display:block;flex-shrink:0} select{max-width:110px;min-height:42px;padding:8px 9px;border:1px solid rgba(116,120,128,.25);border-radius:12px;background:#eef0f3;color:#17181b;font:inherit;font-size:12px;cursor:pointer}select:focus-visible{outline:2px solid #747880;outline-offset:3px}`]
})
export class SelectLanguageComponent {
  constructor(public localization: LocalizationService) {}
}
