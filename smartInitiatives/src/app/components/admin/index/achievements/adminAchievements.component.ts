import { Component, OnInit } from '@angular/core';
import { AchivementsService } from '../../../../services/achievement.service';
import { Achievement } from '../../../../models/achievement';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-admin-achievment',
  templateUrl: './adminAchievements.component.html',
  styleUrls: ['./adminAchievements.component.scss']
})
export class AdminAchivementsComponent implements OnInit {

  achievements: Achievement[] = [];
  achievementForm: FormGroup;

  constructor(private api: AchivementsService, private formBuilder: FormBuilder) {
  
  }

  ngOnInit(): void {
    this.getAchivements();
    this.achievementForm = this.formBuilder.group({
      title: ['', Validators.required],
      image: ['', Validators.required]
  });
  }

  getAchivements() {
    this.api.getAchivements().subscribe(response => {
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
