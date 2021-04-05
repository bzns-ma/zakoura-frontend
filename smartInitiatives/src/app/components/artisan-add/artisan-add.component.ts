import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { error } from 'selenium-webdriver';
import { ArtisanService } from 'src/app/services/artisan.service';
import {Artisan} from '../../models/artisan';
@Component({
  selector: 'app-artisan-add',
  templateUrl: './artisan-add.component.html',
  styleUrls: ['./artisan-add.component.scss']
})
export class ArtisanAddComponent implements OnInit {
  artisanFormGroup? : FormGroup;

  constructor(private formBuilder : FormBuilder,private artisanApi : ArtisanService) { }

  ngOnInit(): void {
    this.artisanFormGroup = this.formBuilder.group({
      first_name : ["",Validators.required],
      last_name : ["",Validators.required],
      title : ["",Validators.required],
      description : ["",Validators.required],
      membership : [false,Validators.required],
      photo : ["",Validators.required],
      website : ["",Validators.required],
      facebook : ["",Validators.required],
      telephone : ["",Validators.required],
      email : ["",Validators.required]      

    });
  }

  saveArtisan(){
    let tempArtisan : Artisan;
    tempArtisan = this.artisanFormGroup.value;
    console.log(tempArtisan);
    this.artisanApi.addArtisan(tempArtisan).subscribe(res=>{
      alert('Opération réussie !');
    },error=>{
      alert("something went wrong!")
    })
  }

}
