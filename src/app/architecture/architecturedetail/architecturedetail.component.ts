import { Component } from '@angular/core';
import { SetupService } from 'src/app/services/setup.service';
 

@Component({
  selector: 'app-architecture',
  templateUrl: './architecturedetail.component.html',
  styleUrls: ['./architecturedetail.component.css']
})
export class ArchitectureDetailComponent {
   slides!: any[] ;
  data: any;
  constructor(private setup: SetupService) {}
  async ngOnInit(): Promise<void> {

    this.data = await this.setup.getPageData('architecture');
    
    this.sortImagesByPlace();

    
    this.slides = this.data.images;
  }

  sortImagesByPlace() {
    if (this.data.images) {
      this.data.images.sort((a: { place: number; }, b: { place: number; }) => a.place - b.place);
    }
  }
}
