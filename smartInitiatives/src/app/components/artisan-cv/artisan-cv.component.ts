import { Component, OnInit, ViewChild } from '@angular/core';
import { ArtisanService } from '../../services/artisan.service';
import { Artisan } from '../../models/artisan';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { off } from 'process';

@Component({
  selector: 'app-artisan-cv',
  templateUrl: './artisan-cv.component.html',
  styleUrls: ['./artisan-cv.component.scss']
})
export class ArtisanCvComponent implements OnInit {
  pageEvent: PageEvent;
  artisans: Artisan[] = [];
  artisanList$: Observable<Artisan[]> | null = null;
  currentArtisansToShow: Artisan[] = [];
  searchText = '';

  length = 100;
  pageSize = 5;
  pageSizeOptions: number[] = [5, 10, 25, 100];

  @ViewChild(MatPaginator) paginator: MatPaginator;


  constructor(private api: ArtisanService, private actro: ActivatedRoute) { }

  ngOnInit(): void {
    this.artisans = this.actro.snapshot.data['artres'].body;

    console.log(this.artisans);
    let l = this.artisans.filter((v, i) =>
      i < 5);
    this.currentArtisansToShow = l;

    // this.paginator.firstPage(); 

  }

  ngAfterViewInit() {
    this.paginator.page.subscribe(
      (event) => console.log(event)
    );
  }

  onPageChanged(e) {
    let firstCut = e.pageIndex * e.pageSize;
    let secondCut = firstCut + e.pageSize;
    this.currentArtisansToShow = this.artisans.slice(firstCut, secondCut);
  }

  getArtisan() {
    this.api.getArtisans().subscribe(response => {
      for (const data of response) {
        this.artisans.push(data);
      }
    });
  }

  getAllArtisans() {
    this.artisanList$ = this.api.getArtisans().pipe(
      map(data => data),
      catchError(error => of(error))
      );
  }

  getSelectedArtisans() {

  }

  getCatArtisans() {

  }
}


