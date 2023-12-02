import { Component } from '@angular/core';
import { SlideInterface } from '../imageSlider/types/slide.interface';
import { SetupService } from '../services/setup.service';

@Component({
  selector: 'app-architecture',
  templateUrl: './architecture.component.html',
  styleUrls: ['./architecture.component.css'],
})
export class ArchitectureComponent {
  slides!: any[];
  data: any;
  constructor(private setup: SetupService) {}
  async ngOnInit(): Promise<void> {
    this.data = await this.setup.getPageData('architecture');

    this.sortImagesByPlace();

    this.slides = this.data.images;
  }

  sortImagesByPlace() {
    if (this.data.images) {
      this.data.images.sort(
        (a: { place: number }, b: { place: number }) => a.place - b.place
      );
    }
  }
}
