import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtreviewsComponent } from './artreviews.component';

describe('ArtreviewsComponent', () => {
  let component: ArtreviewsComponent;
  let fixture: ComponentFixture<ArtreviewsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ArtreviewsComponent]
    });
    fixture = TestBed.createComponent(ArtreviewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
