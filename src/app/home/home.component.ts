import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { SlideInterface } from '../imageSlider/types/slide.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  
  title = 'Jalal Mashhadi Fard';

  slides: SlideInterface[] = [
    { url: '/assets/images/main/slider/1.jpg', title: 'image1' },
    { url: '/assets/images/main/slider/2.jpg', title: 'image2' },
  ];
}
