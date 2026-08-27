import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'jalalmfard';
  menuOpen = false;
  showIntro = true;
  introLeaving = false;
  private introTimers: number[] = [];

  ngOnInit(): void {
    if (typeof window === 'undefined') return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    this.introTimers.push(window.setTimeout(() => this.introLeaving = true, reduced ? 350 : 2200));
    this.introTimers.push(window.setTimeout(() => this.showIntro = false, reduced ? 700 : 2850));
  }

  ngOnDestroy(): void {
    this.introTimers.forEach(timer => window.clearTimeout(timer));
  }

  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
  }

  closeMenu(): void {
    this.menuOpen = false;
  }
}
