import { Component, OnInit } from '@angular/core';
import { EventsService } from '../../../../services/events.service';
import { Event } from '../../../../models/event';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-admin-achievment',
  templateUrl: './adminAchievements.component.html',
  styleUrls: ['./adminAchievements.component.scss']
})
export class AdminEventsComponent implements OnInit {

  achievements: Event[] = [];
  achievementForm: FormGroup;

  constructor(private api: EventsService, private formBuilder: FormBuilder) {
  
  }

  ngOnInit(): void {
    this.getAchivements();
    this.achievementForm = this.formBuilder.group({
      title: ['', Validators.required],
      image: ['', Validators.required]
  });
  }

  getAchivements() {
    this.api.getEvents().subscribe(response => {
      for (const data of response.body) {
        this.achievements.push(data);
      }
    });
  }

  add(){
      this.api.addAchievement({title: this.achievementForm.get("title"), image: this.achievementForm.get("image")});
  }

  modify(id){
    this.api.updateAchievement({title: this.achievementForm.get("title"), image: this.achievementForm.get("image")});
  }

  delete(id){
    this.api.deleteAchievement({title: this.achievementForm.get("title"), image: this.achievementForm.get("image")});
  }

}
