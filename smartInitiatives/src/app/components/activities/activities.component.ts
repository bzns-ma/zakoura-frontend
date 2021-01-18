import { Component, OnInit } from '@angular/core';
import { ActivitiesService } from '../../services/activities.service';
import { Activity } from '../../models/activity';

@Component({
  selector: 'app-activities',
  templateUrl: './activities.component.html',
  styleUrls: ['./activities.component.scss']
})
export class ActivitiesComponent implements OnInit {

  activities: Activity[] = [];

  constructor(private api: ActivitiesService) { }

  ngOnInit(): void {
    this.getActivities();
  }

  getActivities() {
    this.api.getActivities().subscribe(response => {
      for (const data of response.body) {
        this.activities.push(data);
      }
    });
  }
}
