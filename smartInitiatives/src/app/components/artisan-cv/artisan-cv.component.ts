import { Component, OnInit, ViewChild } from '@angular/core';
import { ArtisanService } from '../../services/artisan.service';
import { Artisan } from '../../models/artisan';
import { MatPaginator } from '@angular/material/paginator';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { DataStateEnum } from 'src/app/state/artisan.state';
import { MatTableDataSource } from '@angular/material/table';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-artisan-cv',
  templateUrl: './artisan-cv.component.html',
  styleUrls: ['./artisan-cv.component.scss']
})
export class ArtisanCvComponent implements OnInit {
  artisansnapshot : any;
  artisans: Artisan[] = [];
  artisansdataState : DataStateEnum;
  artisansToShow:Artisan[] = [];

  searchText = '';

  // pagination 
  length = 15;
  pageSize = 9;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  dataSource : MatTableDataSource<Artisan>;
  obs: Observable<any>;

  constructor(private api: ArtisanService, private actro: ActivatedRoute,private cdRef:ChangeDetectorRef) { }

  ngOnInit(): void {
    this.getAllArtisans();
    this.dataSource = new MatTableDataSource<Artisan>(this.artisansToShow);

  }

  ngOnDestroy() {
    if (this.dataSource) { 
      this.dataSource.disconnect(); 
    }
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.artisansToShow = this.artisans.slice(0, 9);
    this.obs = this.dataSource.connect();
    this.cdRef.detectChanges();
  }

  onPageChanged(e) {
    let firstCut = e.pageIndex * e.pageSize;
    let secondCut = firstCut + e.pageSize;
    this.artisansToShow = this.artisans.slice(firstCut, secondCut);
  }

  getAllArtisans() {
    this.artisansnapshot = this.actro.snapshot.data['artres'];
    this.artisans = this.artisansnapshot.data;
    this.artisansToShow = this.artisans;
  }

  getAdherents() {
    this.artisansToShow = this.artisans.filter(data => data.membership == true);
  }

  getCatArtisans() {
    this.artisansToShow = this.artisans.filter(data => data.membership !== true);
  }

  getStatut(member : boolean){
    return member == true ? 'adhérent' : '';
  }
}


