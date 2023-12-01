import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { SlideInterface } from '../imageSlider/types/slide.interface';
import { SetupService } from '../services/setup.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  title = 'Jalal Mashhadi Fard';
  slides!: SlideInterface[] ;
  data: any;
  constructor(private setup: SetupService) {}
  async ngOnInit(): Promise<void> {
    this.data = await this.setup.getPageData('main');
    
    this.sortImagesByPlace();

    
    this.slides = this.data.images;
  }

  sortImagesByPlace() {
    if (this.data.images) {
      this.data.images.sort((a: { place: number; }, b: { place: number; }) => a.place - b.place);
    }
  }

  
}
