import { DOCUMENT } from '@angular/common';
import { Inject, Injectable, Pipe, PipeTransform } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { TRANSLATIONS } from './translations';

export type SiteLanguage = 'en' | 'fa' | 'ar';
const isLanguage = (value: string | null): value is SiteLanguage => value === 'en' || value === 'fa' || value === 'ar';

@Injectable({ providedIn: 'root' })
export class LocalizationService {
  language: SiteLanguage = 'en';
  constructor(@Inject(DOCUMENT) private document: Document, private router: Router) {
    const query = new URLSearchParams(this.document.defaultView?.location.search || '').get('lang');
    // Standard visits always open in English; translated links remain explicit.
    this.apply(isLanguage(query) ? query : 'en');
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        const lang = this.router.parseUrl(event.urlAfterRedirects).queryParams['lang'];
        if (isLanguage(lang)) this.apply(lang);
      }
    });
  }
  select(value: string): void {
    if (!isLanguage(value)) return;
    this.apply(value);
    void this.router.navigate([], { queryParams: { lang: value }, queryParamsHandling: 'merge', preserveFragment: true, replaceUrl: true });
  }
  private apply(language: SiteLanguage): void {
    this.language = language;
    this.document.documentElement.lang = language;
    this.document.documentElement.dir = language === 'en' ? 'ltr' : 'rtl';
  }
  text(value: unknown): string {
    if (value === null || value === undefined) return '';
    const original = String(value);
    if (this.language === 'en') return original;
    const translated = TRANSLATIONS[original.trim()];
    if (translated) return translated[this.language === 'fa' ? 0 : 1];
    const gallery = original.match(/^Published gallery image (\d+) · Amazing Architecture$/);
    if (gallery) return `${this.language === 'fa' ? 'تصویر گالری منتشرشده' : 'صورة المعرض المنشورة'} ${gallery[1]} · Amazing Architecture`;
    return original;
  }
}

@Pipe({ name: 'localize', pure: false })
export class LocalizePipe implements PipeTransform {
  constructor(private localization: LocalizationService) {}
  transform(value: unknown): string { return this.localization.text(value); }
}
