import { Component, OnInit } from '@angular/core';
import { PagesJaunesComponent } from '../pages-jaunes/pages-jaunes.component';

@Component({
  selector: 'app-artisan-cv',
  templateUrl: './artisan-cv.component.html',
  styleUrls: ['./artisan-cv.component.scss']
})
export class ArtisanCvComponent implements OnInit {
  public unique_key: number;
  public parentRef: PagesJaunesComponent;
  constructor() { }

  ngOnInit(): void {
  }

}
