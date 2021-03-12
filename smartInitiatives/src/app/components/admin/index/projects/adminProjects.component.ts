import { Component, OnInit } from '@angular/core';
import { ProjectsService } from '../../../../services/projects.service';
import { Project } from '../../../../models/project';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-admin-projects',
  templateUrl: './adminProjects.component.html',
  styleUrls: ['./adminProjects.component.scss']
})
export class AdminProjectsComponent implements OnInit {

  projects: Project[] = [];
  projectsPage: Project[] = [];
  projectForm: FormGroup;
  pageSize: number = 10;
  currentPage: number = 1;
  nextPage: number = 2;
  previousPage: number = 1;

  constructor(private api: ProjectsService, private formBuilder: FormBuilder) {
  
  }

  ngOnInit(): void {
    this.getProjects();
    this.projectForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      section: ['', Validators.required]
    });
    this.currentPage = 1;
    this.nextPage = 2;
    this.previousPage = 1;
  }

  getProjects() {
    this.api.getProject().subscribe(response => {
      for (const data of response.body) {
        this.projects.push(data);
      }
    });
  }

  add(){
    this.api.addProject({title: this.projectForm.get("title"), description: this.projectForm.get("description"), section: this.projectForm.get("section")});
  }

  modify(id){
    this.api.updateProject({title: this.projectForm.get("title"), description: this.projectForm.get("description"), section: this.projectForm.get("section")});
  }

  delete(id){
    this.api.deleteProject({title: this.projectForm.get("title"), description: this.projectForm.get("description"), section: this.projectForm.get("section")});
  }

  toNextPage(){
    this.previousPage = this.currentPage;
    this.currentPage = this.nextPage;
    this.nextPage = this.nextPage + 1;
  }

  toPreviousPage(){
    this.nextPage = this.currentPage;
    this.currentPage = this.previousPage;
    this.previousPage = this.previousPage - 1;
  }
}
