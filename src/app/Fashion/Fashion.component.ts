import { Component } from '@angular/core';
import { SlideInterface } from '../imageSlider/types/slide.interface';
import { SetupService } from '../services/setup.service';

@Component({
  selector: 'app-Fashion',
  templateUrl: './Fashion.component.html',
  styleUrls: ['./Fashion.component.css'],
})
export class FashionComponent {
  slides!: any[];
  data: any;
  constructor(private setup: SetupService) {}
  async ngOnInit(): Promise<void> {
    this.data = await this.setup.getPageData('Fashion');

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
