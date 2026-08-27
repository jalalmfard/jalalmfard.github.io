import { Component, OnDestroy, OnInit } from '@angular/core';
import { SetupService } from '../services/setup.service';

interface HomeCategory {
  title: string; subtitle: string; route: string; images: string[];
  positions?: string[]; current: number; previous: number; turning: boolean;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, OnDestroy {
  architecture: HomeCategory = {
    title: 'Architecture', subtitle: 'Selected spaces and buildings', route: '/architecture', current: 0, previous: 0, turning: false,
    images: ['/assets/images/main/slider/1414.jpg', '/assets/images/main/slider/1515.jpg', '/assets/images/main/slider/lookout.jpg', '/assets/images/architecture/new-generation/facade.jpg', '/assets/images/architecture/tobe/cover.jpg'],
    positions: ['50% 55%', '50% 50%', '38% 50%', '50% 50%', '50% 50%']
  };
  fashion: HomeCategory = {
    title: 'Fashion', subtitle: 'Fashion, jewelry and sketches', route: '/fashion', current: 0, previous: 0, turning: false,
    images: [
      '/assets/images/fashion/lumiere/campaign-cover.jpg',
      '/assets/images/fashion/lumiere/design-sketch.jpg',
      '/assets/images/jewelry/hera/ring.jpg',
      '/assets/images/fashion/lumiere/studio-look-wide.jpg',
      '/assets/images/jewelry/athena/earrings.jpg',
      '/assets/images/fashion/Noushella.jpg',
      '/assets/images/embodied-archetypes/01-cover.jpg',
      '/assets/images/jewelry/aphrodite/ring.jpg',
      '/assets/images/fashion/lumiere/campaign-outdoor.jpg'
    ],
    positions: ['50% 42%', '50% 50%', '50% 50%', '50% 38%', '50% 50%', '50% 50%', '50% 42%', '50% 50%', '50% 44%']
  };
  art: HomeCategory = {
    title: 'Artworks & Exhibitions', subtitle: 'Drawing, installation and curation', route: '/artworks', current: 0, previous: 0, turning: false,
    images: ['/assets/images/artworks/Jan/Jan 4.jpg', '/assets/images/exhibitions/Feelthe fann02.jpg', '/assets/images/artworks/cars.jpg', '/assets/images/exhibitions/design week.jpg']
  };
  awards = [
    'LOOP Design Awards 2025 — Winner · FEEL Boutique Plaza',
    'Architizer A+Awards 2025 — Special Mention · Jan Plaza',
    'DNA Paris 2025 — Honorable Mention · Jan Plaza',
    'DNA Paris 2025 — Honorable Mention · LOOKOUT/IN Café',
    'Architecture MasterPrize 2025 — Honorable Mention · LOOKOUT/IN Café',
    'NY Product Design Awards 2025 — Silver Winner · NOUSHELLA'
  ];
  currentAward = 0;
  private timers: number[] = [];
  private transitionTimers: number[] = [];

  constructor(private setup: SetupService) {}

  async ngOnInit(): Promise<void> {
    const data = await this.setup.getPageData('architecture');
    const projectCovers = data?.images
      ?.filter((project: { src?: string }) => !!project.src)
      .sort((a: { place?: number }, b: { place?: number }) => (a.place ?? 999) - (b.place ?? 999))
      .slice(0, 9)
      .map((project: { src: string }) => project.src.startsWith('/') ? project.src : `/${project.src}`);
    if (projectCovers?.length) {
      this.architecture.images = projectCovers;
      this.architecture.positions = projectCovers.map(() => '50% 50%');
    }
    if (typeof window === 'undefined' || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    this.timers.push(window.setInterval(() => this.advance(this.architecture), 2000));
    this.timers.push(window.setInterval(() => this.advance(this.fashion), 3100));
    this.timers.push(window.setInterval(() => this.advance(this.art), 3700));
    this.timers.push(window.setInterval(() => this.currentAward = (this.currentAward + 1) % this.awards.length, 3200));
  }

  ngOnDestroy(): void {
    this.timers.forEach((timer) => window.clearInterval(timer));
    this.transitionTimers.forEach((timer) => window.clearTimeout(timer));
  }
  image(category: HomeCategory): string { return category.images[category.current]; }
  previousImage(category: HomeCategory): string { return category.images[category.previous]; }
  imagePosition(category: HomeCategory): string { return category.positions?.[category.current] || '50% 50%'; }
  previousImagePosition(category: HomeCategory): string { return category.positions?.[category.previous] || '50% 50%'; }
  private advance(category: HomeCategory): void {
    category.previous = category.current;
    category.current = (category.current + 1) % category.images.length;
    category.turning = true;
    this.transitionTimers.push(window.setTimeout(() => category.turning = false, 780));
  }
}
