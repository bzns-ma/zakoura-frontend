import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtisanEditComponent } from './artisan-edit.component';

describe('ArtisanEditComponent', () => {
  let component: ArtisanEditComponent;
  let fixture: ComponentFixture<ArtisanEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArtisanEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArtisanEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
