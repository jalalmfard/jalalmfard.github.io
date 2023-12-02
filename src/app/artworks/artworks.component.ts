import { Component } from '@angular/core';
import { SetupService } from '../services/setup.service';

@Component({
  selector: 'app-artworks',
  templateUrl: './artworks.component.html',
  styleUrls: ['./artworks.component.css']
})
export class ArtworksComponent {
  slides!: any[] ;
  data: any;
  constructor(private setup: SetupService) {}
  async ngOnInit(): Promise<void> {
    this.data = await this.setup.getPageData('artworks');
    
    this.sortImagesByPlace();

    
    this.slides = this.data.images;
  }

  sortImagesByPlace() {
    if (this.data.images) {
      this.data.images.sort((a: { place: number; }, b: { place: number; }) => a.place - b.place);
    }
  }
}
