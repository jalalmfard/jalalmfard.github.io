import { Component } from '@angular/core';
import { SetupService } from 'src/app/services/setup.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-poster',
  templateUrl: './posterdetail.component.html',
  styleUrls: ['./posterdetail.component.css']
})
export class posterDetailComponent {
   slides!: any[] ;
  data: any;
  selectedItem: any;
  constructor(private setup: SetupService,private route: ActivatedRoute) {}
  async ngOnInit(): Promise<void> {

    this.data = await this.setup.getPageData('poster');
    
    this.sortImagesByPlace();

    
    this.slides = this.data.images;

    this.route.params.subscribe(params => {
      // The 'id' parameter is accessible as params.id
      const id = params['id'];
      
      // Now you can use the 'id' in your component logic
      this.searchById(id);
      
      
    });
  }

  sortImagesByPlace() {
    if (this.data.images) {
      this.data.images.sort((a: { place: number; }, b: { place: number; }) => a.place - b.place);
    }
  }




// Function to search for an item by ID
searchById(id: string): void {
  this.selectedItem = this.searchRecursive(this.data, id);
  console.log('Selected Item:', this.selectedItem);
}

// Recursive function to search for an item by ID
private searchRecursive(data: any, id: string): any {
  if (data.id === id) {
    return data;
  }

  if (data.images && Array.isArray(data.images)) {
    for (const item of data.images) {
      const result = this.searchRecursive(item, id);
      if (result) {
        return result;
      }
    }
  }

  return null;
}





}
