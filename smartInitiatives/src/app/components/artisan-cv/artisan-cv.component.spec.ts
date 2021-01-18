import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtisanCvComponent } from './artisan-cv.component';

describe('ArtisanCvComponent', () => {
  let component: ArtisanCvComponent;
  let fixture: ComponentFixture<ArtisanCvComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArtisanCvComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArtisanCvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
