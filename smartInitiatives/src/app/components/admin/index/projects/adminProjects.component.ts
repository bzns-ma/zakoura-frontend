import { Component, OnInit } from '@angular/core';
import { ProjectsService } from '../../../../services/projects.service';
import { Project } from '../../../../models/project';

@Component({
  selector: 'app-admin-projects',
  templateUrl: './adminProjects.component.html',
  styleUrls: ['./adminProjects.component.scss']
})
export class AdminProjectsComponent implements OnInit {

  projects: Project[] = [];

  constructor(private api: ProjectsService) { }

  ngOnInit(): void {
    this.getProjects();
  }

  getProjects() {
    this.api.getProject().subscribe(response => {
      for (const data of response.body) {
        this.projects.push(data);
      }
    });
  }

  add(){

  }

  modify(id){

  }

  delete(id){

  }

}
