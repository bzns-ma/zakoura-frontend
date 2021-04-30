import { formatDate } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { map } from 'rxjs/operators';
import { Evnt } from 'src/app/models/Event_';
import { EventsService } from 'src/app/services/events.service';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { MatDialog, MatDialogConfig,MatDialogModule  } from '@angular/material/dialog';
import { EventDetailsComponent } from '../event-details/event-details.component';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss'],
  providers: [DatePipe]
})
export class EventsComponent implements OnInit {
  events: Evnt[];
  lfCard: any;
  shortFormMonth: string[] = [];
  eventDay: string[] = [];
  monthShortNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];

  // pagination 
  pageSize = 2;
  // pageSizeOptions: number[] = [3, 5, 8, 10];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  dataSource: MatTableDataSource<Evnt>;
  activeEvents: Evnt[];
  statutOfevent: string;
  statutStyle: string;
  now = new Date();
  current_date = '';
  constructor(
    private api: EventsService, 
    private cdRef: ChangeDetectorRef, 
    private datePipe: DatePipe,
    private router : Router
    ) { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    // this.obs = this.dataSource.connect();
    this.current_date = this.datePipe.transform(this.now, 'dd/MM/yyyy');
    this.api.getEvents().subscribe(data => {
      this.events = data;
      this.activeEvents = this.events.slice(0, this.pageSize) || [];
      if (this.activeEvents && this.activeEvents.length >= 0) {
        this.dataSource = new MatTableDataSource<Evnt>(this.events);
        this.dataSource.paginator = this.paginator;
      }
    }, (error => {
      console.log('error connexion or events > ', error);
    }))
    this.cdRef.detectChanges();

  }

  onPageChanged(e) {
    let firstCut = e.pageIndex * e.pageSize;
    let secondCut = firstCut + e.pageSize;
    this.activeEvents = this.events.slice(firstCut, secondCut);
  }

  // getlfCard() {
  //   return this.lfCard = (Math.random() >= 0.5) ? 'fl-left' : 'fl-right';
  // }

  getMonthShortName(event : Evnt) {
      let splitedDate = event.eventDate.split('/');
      let month = splitedDate[1];
      return this.monthShortNames[+month - 1];
  }

  getDayFromDate(event : Evnt) {
    // console.log('<',event.eventDate,'>');
      let day = event.eventDate.split('/');
      return day[0];
  }

  getStatutOfevents(event: any) {
   return this.isUpcoming(event.eventDate) == true ?'À venir' :  'passé';
  }

  isUpcoming(eventDate: string) {
    let evparts = eventDate.split('/');
    let evdate = Number(evparts[2] + evparts[1] + evparts[0]);
    let curparts = this.current_date.split('/');
    let curdate = Number(curparts[2] + curparts[1] + curparts[0]);
 
    return curdate < evdate;
  }

  displayedTime(time : string ){
    let st = time.split('.');
    return st[0]+'h'+st[1];
  }

  gotoEventDetails(id){
    console.log(id);
    this.router.navigate(["eventDetail",id]).then(res =>{
      console.log(res,'routes exists');
    }).catch(e=>{
      console.log('route not found with this error : ',e)
    })
  }


}
