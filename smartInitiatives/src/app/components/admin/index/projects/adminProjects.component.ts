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
  projectForm: FormGroup;
  


  constructor(private api: ProjectsService, private formBuilder: FormBuilder) {
  
  }

  ngOnInit(): void {
    this.getProjects();
    this.projectForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      section: ['', Validators.required]
  });
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

}
