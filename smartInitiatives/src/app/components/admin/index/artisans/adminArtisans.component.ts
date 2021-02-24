import { Component, OnInit } from '@angular/core';
import { ArtisanService } from '../../../../services/artisan.service';
import { Artisan } from '../../../../models/artisan';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-admin-artisants',
  templateUrl: './adminArtisans.component.html',
  styleUrls: ['./adminArtisans.component.scss']
})
export class AdminArtisansComponent implements OnInit {

  artisans: Artisan[] = [];
  artisanForm: FormGroup;
  
  constructor(private api: ArtisanService, private formBuilder: FormBuilder) {
  
  }

  ngOnInit(): void {
    this.getArtisans();
    this.artisanForm = this.formBuilder.group({
      title: ['', Validators.required],
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      facebook: ['', Validators.required],
      twitter: ['', Validators.required],
      linkedin: ['', Validators.required]
  });
  }

  getArtisans() {
    this.api.getArtisans().subscribe(response => {
      for (const data of response) {
        this.artisans.push(data);
      }
    });
  }

  add(){
    this.api.addArtisan({title: this.artisanForm.get("title"), firstname: this.artisanForm.get("firstname"), tiwtter: this.artisanForm.get("tiwtter"), lastname: this.artisanForm.get("lastname"), facebook: this.artisanForm.get("facebook"), linkedin: this.artisanForm.get("linkedin")});
  }

  modify(id){
    this.api.updateArtisan({title: this.artisanForm.get("title"), firstname: this.artisanForm.get("firstname"), tiwtter: this.artisanForm.get("tiwtter"), lastname: this.artisanForm.get("lastname"), facebook: this.artisanForm.get("facebook"), linkedin: this.artisanForm.get("linkedin")});
  }

  delete(id){
    this.api.deleteArtisan({title: this.artisanForm.get("title"), firstname: this.artisanForm.get("firstname"), tiwtter: this.artisanForm.get("tiwtter"), lastname: this.artisanForm.get("lastname"), facebook: this.artisanForm.get("facebook"), linkedin: this.artisanForm.get("linkedin")});
  }

}
