import { Component, OnInit } from '@angular/core';
import { ArtisanService } from '../../services/artisan.service';
import { Artisan } from '../../models/artisan';

@Component({
  selector: 'app-artisan-cv',
  templateUrl: './artisan-cv.component.html',
  styleUrls: ['./artisan-cv.component.scss']
})
export class ArtisanCvComponent implements OnInit {

  artisan: Artisan[] = [];

  constructor(private api: ArtisanService) { }

  ngOnInit(): void {
    this.getArtisan();
  }

  getArtisan() {
    this.api.getArtisan().subscribe(response => {
      console.log(response);
      for (const data of response.body) {
        this.artisan.push(data);
      }
    });
  }
}
