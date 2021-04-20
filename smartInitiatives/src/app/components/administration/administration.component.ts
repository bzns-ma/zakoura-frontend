import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { ActivatedRoute, Router } from '@angular/router';
import { Artisan } from 'src/app/models/artisan';
import { ArtisanService } from 'src/app/services/artisan.service';
import { EventsService } from 'src/app/services/events.service';

@Component({
  selector: 'app-administration',
  templateUrl: './administration.component.html',
  styleUrls: ['./administration.component.scss']
})
export class AdministrationComponent implements OnInit {

  tabSelectedIndex = 0;
  keyword = '';
  links = ['artisan', 'événement'];
  activeLink = this.links[0];
  tabIndex = 0;
  nouveaulabel = '';
  artisansnapshot: any;
  artisans: Artisan[] = []
  activeArtisans : Artisan[] = [] ;
  /** event variable */
  events: any[] = [];
  activeEvents: Event[];
  pageSize = 5;
  paginatorLength = 0;
  // pageSizeptions = [5,10,20]
  @ViewChild(MatPaginator) paginator: MatPaginator;
  dataSource: MatTableDataSource<any>;

  constructor(
    private artisanService: ArtisanService,
    private eventService: EventsService,
    private actro: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getAllArtisans();
    this.getAllEvents();
    this.tabSelectedIndex = parseInt(this.actro.snapshot.queryParamMap.get('tab'),10); 
    console.log('tabSelectedIndex',this.tabSelectedIndex);
    // this.activeLink = this.links[this.tabSelectedIndex];
    // this.tabSelectedIndex == 0 ? this.paginatorLength =this.artisans.length :this.paginatorLength =this.events.length  ;
  }


  getAllArtisans() {
    this.artisansnapshot = this.actro.snapshot.data['artres'];
    this.artisans = this.artisansnapshot.data;
    this.activeArtisans = this.artisans.slice(0, this.pageSize) || [];
    if (this.activeArtisans && this.activeArtisans.length >= 0) {
      this.dataSource = new MatTableDataSource<Artisan>(this.artisans);
      this.dataSource.paginator = this.paginator;
    }
  }
  getAllEvents() {
    this.eventService.getEvents().subscribe(data => {
      this.events = data;
      this.activeEvents = this.events.slice(0, this.pageSize) || [];
      if (this.activeEvents && this.activeEvents.length >= 0) {
        this.dataSource = new MatTableDataSource<Event>(this.events);
        this.dataSource.paginator = this.paginator;
      }
    }, (error => {
      console.log('error connexion or events > ', error);
    }))
  }

  search(value) {
  }

  add() {
    if (this.tabSelectedIndex == 1) {
      this.addEvent();
    } else {
      this.addArtisan();

    }
  }
  addEvent() {
    this.router.navigateByUrl("/newEvent")
  }

  addArtisan() {
    this.router.navigateByUrl("/newArtisan")
  }

  modifyArtisan(id) {
    this.router.navigateByUrl("/editArtisan/" + id)
  }

  modifyEvent(id) {
    this.router.navigateByUrl("/editEvent/" + id)

  }

  deleteArtisan(id) {
    let conf = confirm("Etes vous sure de vouloir supprimer cet artisan ?")
    if (conf == true) {
      this.artisanService.deleteArtisan(id).subscribe(res => {
        this.removeItemFromDom(id);
        this.paginatorLength =this.artisans.length;
      });
    }
    this.removeItemFromDom(id);
  }

  removeItemFromDom(id) {
    const artisanToremove = this.artisans.find(artisan => artisan._id == id);
    console.log(artisanToremove);
    this.artisans = this.artisans.filter(artisan => artisan !== artisanToremove);
  }

  deleteEvent(id) {

  }

  tabChanged(tabChangeEvent: MatTabChangeEvent): void {
    // 0 > artisans 1 > events
    this.tabIndex = tabChangeEvent.index;

    this.router.navigate([], { relativeTo: this.actro, queryParams: {
      tab: tabChangeEvent.index
    }});
    this.tabSelectedIndex = tabChangeEvent.index

    if (this.tabIndex == 0) {
      this.paginatorLength = this.artisans.length;
    } else if (this.tabIndex == 1) {
      this.paginatorLength = this.events.length;
      this.getAllEvents();
    }

    // this.activeLink = this.links[this.tabIndex];
  }

  onPageChanged(e) {
    let firstCut = e.pageIndex * e.pageSize;
    let secondCut = firstCut + e.pageSize;
    if(this.tabIndex == 0){
      this.activeArtisans = this.artisans.slice(firstCut, secondCut);
    }else if(this.tabIndex == 1){
      this.activeEvents = this.events.slice(firstCut, secondCut);
    }
  }


}
