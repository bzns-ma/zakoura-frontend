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
  artisansPage: Artisan[] = [];
  artisanForm: FormGroup;
  pageSize: number = 10;
  currentPage: number = 1;
  nextPage: number = 2;
  previousPage: number = 1;
  
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
      linkedin: ['', Validators.required],
      number: ['', Validators.required],
      membership: ['', Validators.required]
    });
    this.currentPage = 1;
    this.nextPage = 2;
    this.previousPage = 1;
  }

  getArtisans() {
    this.api.getArtisans().subscribe(response => {
      for (const data of response) {
        this.artisans.push(data);
        this.artisansPage = this.artisans.slice(0, this.pageSize);
      }
    });
  }

  add(){
    // this.api.addArtisan({firstname: this.artisanForm.get("firstname"), tiwtter: this.artisanForm.get("tiwtter"), photo: this.artisanForm.get("photo"), 
    // lastname: this.artisanForm.get("lastname"), facebook: this.artisanForm.get("facebook"), linkedin: this.artisanForm.get("linkedin"),
    // number: this.artisanForm.get("number"), membership: this.artisanForm.get("membership"), website: this.artisanForm.get("website")});
  }

  modify(id){
    this.api.updateArtisan(id, {firstname: this.artisanForm.get("firstname"), tiwtter: this.artisanForm.get("tiwtter"), photo: this.artisanForm.get("photo"), 
    lastname: this.artisanForm.get("lastname"), facebook: this.artisanForm.get("facebook"), linkedin: this.artisanForm.get("linkedin"),
    number: this.artisanForm.get("number"), membership: this.artisanForm.get("membership"), website: this.artisanForm.get("website")});
  }

  delete(id){
    this.api.deleteArtisan(id);
  }

  toNextPage(){
    if (this.currentPage * this.pageSize < this.artisans.length) {
      this.previousPage = this.currentPage;
      this.currentPage = this.nextPage;
      this.nextPage = this.nextPage + 1;
      this.artisansPage = this.artisans.slice(this.pageSize * this.currentPage - this.pageSize, this.pageSize * this.currentPage);
    }
  }

  toPreviousPage(){
    if (this.previousPage - 1 >= 0) {
      this.nextPage = this.currentPage;
      this.currentPage = this.previousPage;
      this.previousPage = this.previousPage - 1;
      this.artisansPage = this.artisans.slice(this.pageSize * this.currentPage - this.pageSize, this.pageSize * this.currentPage);
    }
  }

}
