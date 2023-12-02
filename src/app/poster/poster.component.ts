import { Component } from '@angular/core';
import { SetupService } from '../services/setup.service';

@Component({
  selector: 'app-poster',
  templateUrl: './poster.component.html',
  styleUrls: ['./poster.component.css']
})
export class PosterComponent {
  slides!: any[];
  data: any;
  constructor(private setup: SetupService) {}
  async ngOnInit(): Promise<void> {
    this.data = await this.setup.getPageData('poster');

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
