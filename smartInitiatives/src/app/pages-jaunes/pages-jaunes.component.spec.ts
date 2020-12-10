import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagesJaunesComponent } from './pages-jaunes.component';

describe('PagesJaunesComponent', () => {
  let component: PagesJaunesComponent;
  let fixture: ComponentFixture<PagesJaunesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PagesJaunesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PagesJaunesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
