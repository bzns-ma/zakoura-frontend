import { Component, OnInit } from '@angular/core';
import { Artisan } from 'src/app/models/artisan';
import { ArtisanService } from 'src/app/services/artisan.service';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss']
})
export class TeamComponent implements OnInit {
  artisans: Artisan[] = [];

  constructor(private api: ArtisanService) { }

  ngOnInit(): void {
    this.getArtisan();
  }
  getArtisan() {
    this.api.getArtisan().subscribe(response => {
      for (const data of response.body) {
        this.artisans.push(data);
      }
    });
  }
}
