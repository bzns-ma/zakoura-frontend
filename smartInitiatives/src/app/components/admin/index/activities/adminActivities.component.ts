import { Component, OnInit } from '@angular/core';
import { ActivitiesService } from '../../../../services/activities.service';
import { Activity } from '../../../../models/activity';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-admin-activities',
  templateUrl: './adminActivities.component.html',
  styleUrls: ['./adminActivities.component.scss']
})
export class AdminActivitiesComponent implements OnInit {

  activities: Activity[] = [];
  activityForm: FormGroup;

  constructor(private api: ActivitiesService, private formBuilder: FormBuilder) {
  
  }

  ngOnInit(): void {
    this.getActivities();
    this.activityForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required]
  });
  }

  getActivities() {
    this.api.getActivities().subscribe(response => {
      for (const data of response.body) {
        this.activities.push(data);
      }
    });
  }

  add(){
    this.api.addActivity({title: this.activityForm.get("title"), image: this.activityForm.get("description")});
  }

  modify(id){
    this.api.updateActivity({title: this.activityForm.get("title"), image: this.activityForm.get("description")});
  }

  delete(id){
    this.api.deleteActivity({title: this.activityForm.get("title"), image: this.activityForm.get("description")});
  }

}
