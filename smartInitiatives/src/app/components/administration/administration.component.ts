import { Component, OnInit } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { ActivatedRoute, Router } from '@angular/router';
import { Artisan } from 'src/app/models/artisan';
import { ArtisanService } from 'src/app/services/artisan.service';

@Component({
  selector: 'app-administration',
  templateUrl: './administration.component.html',
  styleUrls: ['./administration.component.scss']
})
export class AdministrationComponent implements OnInit {
  isArtisan = false;
  isEvent = false;
  artisansnapshot: any;
  artisans: Artisan[] = [];
  keyword = '';
  links = ['Artisans', 'Events'];
  activeLink = this.links[0];
  tabIndex= 0;
  nouveaulabel='';
  // imageUrl:any='';
 
  constructor(
    private api: ArtisanService, 
    private actro: ActivatedRoute, 
    private router: Router
    ) { }

  ngOnInit(): void {
    this.getAllArtisans();
  }

  switchToArtisan() {
    this.isArtisan = true;
    this.isEvent = false;
  }
  switchToEvent() {
    this.isArtisan = false;
    this.isEvent = true;
  }

  getAllArtisans() {
    this.artisansnapshot = this.actro.snapshot.data['artres'];
    this.artisans = this.artisansnapshot.data; 
  }

  search(value) {
  }

  addArtisan() {
    this.router.navigateByUrl("/newArtisan")
  }

  modifyArtisan(id) {
    this.router.navigateByUrl("/editArtisan/"+id)
  }

  deleteArtisan(id) {
    let conf = confirm("Etes vous sure de vouloir supprimer cet artisan ?")
    if (conf == true) {
      this.api.deleteArtisan(id).subscribe(res => {
        this.removeItemFromDom(id);

      });
    }
    this.removeItemFromDom(id);
  }
  removeItemFromDom(id){
    const artisanToremove  = this.artisans.find(artisan => artisan._id ==id);
    this.artisans = this.artisans.filter(artisan => artisan !== artisanToremove);
  }

  tabChanged(tabChangeEvent: MatTabChangeEvent): void {
    this.tabIndex = tabChangeEvent.index;
    console.log( this.tabIndex);
  }

  add(){
    if(this.tabIndex == 0) {
      this.addArtisan();
    }else if(this.tabIndex == 1){
      this.addEvent();
    }
  }
  addEvent() {
    throw new Error('Method not implemented.');
  }
}
