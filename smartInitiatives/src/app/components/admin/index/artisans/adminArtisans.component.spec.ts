import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminArtisansComponent } from './adminArtisans.component';

describe('AdminArtisansComponent', () => {
  let component: AdminArtisansComponent;
  let fixture: ComponentFixture<AdminArtisansComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminArtisansComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminArtisansComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
