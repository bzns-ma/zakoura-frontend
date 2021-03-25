import { formatDate } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { map } from 'rxjs/operators';
import { Event } from 'src/app/models/event';
import { EventsService } from 'src/app/services/events.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {
  events: Event[];
  lfCard: any;
  shortFormMonth: string[] = [];
  eventDay: string[] = [];
  monthShortNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];

  test: any = [
    {
      date: "03/12/2021",
      description: "The best event of the year",
      end_time: "20h",
      id: "1",
      photo: "photo 1",
      place: "place 1",
      start_time: "14h",
      title: "WWDC",
      _id: "603e569c1fe97e3bc4ef84d2"
    },
    {
      date: "03/12/2021",
      description: "The best event of the year",
      end_time: "20h",
      id: "1",
      photo: "photo 1",
      place: "place 1",
      start_time: "14h",
      title: "WWDC",
      _id: "603e569c1fe97e3bc4ef84d2"
    }
  ]

  // pagination 
  pageSize = 2;
  // pageSizeOptions: number[] = [3, 5, 8, 10];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  dataSource: MatTableDataSource<Event>;
  activeEvents: Event[];
  statutOfevent: string;
  statutStyle: string;
  constructor(private api: EventsService, private cdRef: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.api.getEvents().subscribe(data => {
      this.events = data;
      this.activeEvents = this.events.slice(0, this.pageSize) || [];
      if (this.activeEvents && this.activeEvents.length >= 0) {
        this.dataSource = new MatTableDataSource<Event>(this.events);
        this.dataSource.paginator = this.paginator;
        this.getStatutOfevents('19/03/2021');
      }
    }, (error => {
      console.log('error connexion or events > ', error);
    }))

  }

  ngAfterViewInit() {
    // this.obs = this.dataSource.connect();
    this.cdRef.detectChanges();

  }

  onPageChanged(e) {
    let firstCut = e.pageIndex * e.pageSize;
    let secondCut = firstCut + e.pageSize;
    this.activeEvents = this.events.slice(firstCut, secondCut);
  }

  getlfCard() {
    return this.lfCard = (Math.random() >= 0.5) ? 'fl-left' : 'fl-right';
  }

  getStatutStyle() {
    // this.statutStyle = 'background-color: red;'
    return this.statutStyle = this.statutOfevent == 'À venir' ? 'background-color: orange;' : 'background-color: gray;';
  }

  getMonthShortName(event) {
    if (typeof event['date'] == 'string' && this.validateDateFormat(event['date'])) {
      let splitedDate = event['date'].split('/');
      let day = splitedDate[0];
      let month = splitedDate[1];
      let year = splitedDate[2];
      return this.monthShortNames[+month - 1];
    } else {
      return '';
    }
  }

  getDayFromDate(event){
    if (typeof event['date'] == 'string' && this.validateDateFormat(event['date'])) {
      let splitedDate = event['date'].split('/');
      return splitedDate[0];
    } else {
      return '';
    }
  }

  validateDateFormat(str: string) {
    return (str.match(/^[0-9]{2}\/[0-9]{2}\/[0-9]{4}$/) !== null) ? true : false;
  }

  getStatutOfevents(event) {
    if (this.isUpcoming( event['date'])) {
      this.statutOfevent = 'À venir';
    } else {
      this.statutOfevent = 'passé'
    }
    return this.statutOfevent;
  }

  isUpcoming(dateString1: string) {
    if(typeof dateString1 == 'string' && this.validateDateFormat(dateString1)){
      let splitedDate = dateString1.split('/');
      let day = splitedDate[0];
      let month = splitedDate[1];
      let year = splitedDate[2];
      let current_date = new Date();
      current_date.setHours(0, 0, 0, 0);
      console.log(+day, +month, +year);
      let evdate = new Date(+year, 3 - 1, +day);
      return current_date.getTime() < evdate.getTime();
    }

  }
}
