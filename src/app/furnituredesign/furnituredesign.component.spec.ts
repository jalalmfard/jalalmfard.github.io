import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FurnituredesignComponent } from './furnituredesign.component';

describe('FurnituredesignComponent', () => {
  let component: FurnituredesignComponent;
  let fixture: ComponentFixture<FurnituredesignComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FurnituredesignComponent]
    });
    fixture = TestBed.createComponent(FurnituredesignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
