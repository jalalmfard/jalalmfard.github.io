import { Component } from '@angular/core';
import { SetupService } from '../services/setup.service';

@Component({
  selector: 'app-exhibitions',
  templateUrl: './exhibitions.component.html',
  styleUrls: ['./exhibitions.component.css']
})
export class ExhibitionsComponent {
  slides!: any[] ;
  data: any;
  constructor(private setup: SetupService) {}
  async ngOnInit(): Promise<void> {
    this.data = await this.setup.getPageData('exhibitions');
    
    this.sortImagesByPlace();

    
    this.slides = this.data.images;
  }

  sortImagesByPlace() {
    if (this.data.images) {
      this.data.images.sort((a: { place: number; }, b: { place: number; }) => a.place - b.place);
    }
  }
}
