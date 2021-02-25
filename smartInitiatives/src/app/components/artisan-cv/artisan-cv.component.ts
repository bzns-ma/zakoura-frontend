import { Component, OnInit, ViewChild } from '@angular/core';
import { ArtisanService } from '../../services/artisan.service';
import { Artisan } from '../../models/artisan';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { off } from 'process';
import { AppDataState, DataStateEnum } from 'src/app/state/artisan.state';

@Component({
  selector: 'app-artisan-cv',
  templateUrl: './artisan-cv.component.html',
  styleUrls: ['./artisan-cv.component.scss']
})
export class ArtisanCvComponent implements OnInit {
  pageEvent: PageEvent;
  artisansnapshot : any;
  artisans: Artisan[] = [];
  artisansdataState : DataStateEnum;
  artisansToShow:Artisan[] = [];
  // artisanList$: Observable<AppDataState<Artisan[]>> | null = null;
  currentArtisansToShow: Artisan[] = [];
  searchText = '';

  length = 100;
  pageSize = 5;
  pageSizeOptions: number[] = [5, 10, 25, 100];

  @ViewChild(MatPaginator) paginator: MatPaginator;


  constructor(private api: ArtisanService, private actro: ActivatedRoute) { }

  ngOnInit(): void {
    // this.artisans = this.actro.snapshot.data['artres'];
    // console.log(this.artisans);

    // console.log(this.artisans);
    // let l = this.artisans.filter((v, i) =>
    //   i < 5);
    // this.currentArtisansToShow = l;

    // this.paginator.firstPage(); 

  }

  ngAfterViewInit() {
    // this.paginator.page.subscribe(
    //   (event) => console.log(event)
    // );
  }

  // onPageChanged(e) {
  //   let firstCut = e.pageIndex * e.pageSize;
  //   let secondCut = firstCut + e.pageSize;
  //   this.currentArtisansToShow = this.artisans.slice(firstCut, secondCut);
  // }

  // getArtisan() {
  //   this.api.getArtisans().subscribe(response => {
  //     for (const data of response) {
  //       this.artisans.push(data);
  //     }
  //   });
  // }

  getAllArtisans() {
    this.artisansnapshot = this.actro.snapshot.data['artres'];
    this.artisans = this.artisansnapshot.data;
    this.artisansToShow = this.artisans;
    console.log(this.artisans);
  }

  getAdherents() {
    this.artisansToShow = this.artisans.filter(data => data.first_name == "bill");
    console.log(this.artisansToShow);
  }

  getCatArtisans() {

  }
}


