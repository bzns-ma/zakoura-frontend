import { Component, OnInit } from '@angular/core';
import { ProjectsService } from '../../services/projects.service';
import { Project } from '../../models/project';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {

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

}
