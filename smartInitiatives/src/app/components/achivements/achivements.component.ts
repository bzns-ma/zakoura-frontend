import { Component, OnInit } from '@angular/core';
import { AchivementsService } from '../../services/achivements.service';
import { Achivement } from '../../models/achivement';

@Component({
  selector: 'app-achivements',
  templateUrl: './achivements.component.html',
  styleUrls: ['./achivements.component.scss']
})
export class AchivementsComponent implements OnInit {

  achivements: Achivement[] = [];

  constructor(private api: AchivementsService) { }

  ngOnInit(): void {
    this.getAchivements();
  }

  getAchivements() {
    this.api.getAchivements().subscribe(response => {
      console.log(response);
      for (const data of response.body) {
        this.achivements.push(data);
      }
    });
  }
}
