import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { LocalizationService } from './i18n/localization.service';
import { Component, ElementRef, HostListener, OnDestroy, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  constructor(public localization: LocalizationService, private router: Router) {}
  @ViewChild('menuToggle') menuToggle?: ElementRef<HTMLButtonElement>;
  private navigation?: Subscription;
  title = 'jalalmfard';
  menuOpen = false;
  showIntro = false;
  introLeaving = false;
  private introTimers: number[] = [];

  ngOnInit(): void {
    this.navigation = this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) this.closeMenu();
    });
    if (typeof window === 'undefined') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    try {
      if (window.sessionStorage.getItem('portfolio-intro')) return;
      window.sessionStorage.setItem('portfolio-intro', 'seen');
    } catch { /* Storage may be unavailable in private browsing. */ }
    this.showIntro = true;
    this.introTimers.push(window.setTimeout(() => this.introLeaving = true, 900));
    this.introTimers.push(window.setTimeout(() => this.showIntro = false, 1250));
  }

  ngOnDestroy(): void {
    this.navigation?.unsubscribe();
    this.introTimers.forEach(timer => window.clearTimeout(timer));
  }

  @HostListener('document:keydown.escape')
  escapeMenu(): void {
    if (!this.menuOpen) return;
    this.closeMenu();
    this.menuToggle?.nativeElement.focus();
  }

  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
  }

  closeMenu(): void {
    this.menuOpen = false;
  }
}
