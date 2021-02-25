import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAchivementsComponent } from './adminAchievements.component';

describe('AdminArtisansComponent', () => {
  let component: AdminAchivementsComponent;
  let fixture: ComponentFixture<AdminAchivementsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminAchivementsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminAchivementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
