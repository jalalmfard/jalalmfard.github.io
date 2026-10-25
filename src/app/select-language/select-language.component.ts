import { Component, ElementRef, HostListener } from '@angular/core';
import { LocalizationService } from '../i18n/localization.service';

@Component({
  selector: 'app-select-language',
  template: `
    <details #picker dir="ltr">
      <summary aria-label="Language / زبان / اللغة" title="Language / زبان / اللغة">
        {{ localization.language.toUpperCase() }}<span aria-hidden="true">⌄</span>
      </summary>
      <div class="languages">
        <button type="button" lang="en" [class.active]="localization.language === 'en'" (click)="choose('en', picker)">English</button>
        <button type="button" lang="fa" [class.active]="localization.language === 'fa'" (click)="choose('fa', picker)">فارسی</button>
        <button type="button" lang="ar" [class.active]="localization.language === 'ar'" (click)="choose('ar', picker)">العربية</button>
      </div>
    </details>
  `,
  styles: [`
    :host{display:block;flex-shrink:0}
    details{position:relative}
    summary{display:flex;align-items:center;justify-content:center;gap:5px;min-width:38px;min-height:40px;padding:0 2px;list-style:none;color:#70747b;font:400 10px/1 Arial,sans-serif;letter-spacing:.08em;cursor:pointer}
    summary::-webkit-details-marker{display:none}
    summary span{font-size:12px;letter-spacing:0}
    summary:hover,details[open] summary{color:#17181b}
    summary:focus-visible,button:focus-visible{outline:1px solid #747880;outline-offset:3px;border-radius:4px}
    .languages{position:absolute;right:0;top:calc(100% + 8px);min-width:104px;padding:5px;border-radius:10px;background:#f5f6f7;box-shadow:0 6px 22px rgba(23,24,27,.12);z-index:60}
    :host-context([dir="rtl"]) .languages{right:auto;left:0}
    button{display:block;width:100%;padding:10px 12px;border:0;border-radius:6px;background:transparent;color:#70747b;font:12px/1.4 Tahoma,Arial,sans-serif;text-align:center;cursor:pointer}
    button:hover,button.active{color:#17181b;background:#e8eaed}
  `]
})
export class SelectLanguageComponent {
  constructor(public localization: LocalizationService, private element: ElementRef<HTMLElement>) {}
  choose(language: string, picker: HTMLDetailsElement): void {
    this.localization.select(language);
    picker.open = false;
    picker.querySelector('summary')?.focus();
  }
  @HostListener('document:click', ['$event']) closeOutside(event: MouseEvent): void {
    if (!this.element.nativeElement.contains(event.target as Node)) this.close();
  }
  @HostListener('keydown.escape') close(): void {
    const picker = this.element.nativeElement.querySelector('details');
    if (picker) picker.open = false;
  }
}
