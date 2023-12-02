import { Component } from '@angular/core';
import { SetupService } from '../services/setup.service';

@Component({
  selector: 'app-furnituredesign',
  templateUrl: './furnituredesign.component.html',
  styleUrls: ['./furnituredesign.component.css']
})
export class FurnituredesignComponent {
  slides!: any[] ;
  data: any;
  constructor(private setup: SetupService) {}
  async ngOnInit(): Promise<void> {
    this.data = await this.setup.getPageData('furnituredesign');
    
    this.sortImagesByPlace();

    
    this.slides = this.data.images;
  }

  sortImagesByPlace() {
    if (this.data.images) {
      this.data.images.sort((a: { place: number; }, b: { place: number; }) => a.place - b.place);
    }
  }
}
