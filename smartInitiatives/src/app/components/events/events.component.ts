import { formatDate } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { map } from 'rxjs/operators';
import { Events } from 'src/app/models/events';
import { EventsService } from 'src/app/services/events.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {
  events: Events[];
  lfCard: any;
  shortFormMonth: string;
  eventDay: string;
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
  dataSource: MatTableDataSource<Events>;
  activeEvents: Events[];
  statutOfevent: string;
  statutStyle: string;
  constructor(private api: EventsService, private cdRef: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.api.getEvents().subscribe(data => {
      this.events = data;
      console.log(this.events);
      this.activeEvents = this.events.slice(0, this.pageSize) || [];
      if (this.activeEvents && this.activeEvents.length >= 0) {
        this.dataSource = new MatTableDataSource<Events>(this.events);
        this.dataSource.paginator = this.paginator;
        this.getMonthShortName(this.activeEvents['date']);
        this.getStatutOfevents('06/03/2021');
      }
    })

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

  getMonthShortName(eventDate: string) {
    eventDate = '12/12/2021';
    if (this.validateDateFormat(eventDate)) {
      let splitedDate = eventDate.split('/');
      let day = splitedDate[0];
      let month = splitedDate[1];
      let year = splitedDate[2];
      this.shortFormMonth = this.monthShortNames[+month - 1];
      this.eventDay = day;
    } else {
      this.shortFormMonth = '';
      console.log('error in events Date format !');
    }

  }

  validateDateFormat(str) {
    return str.match(/^[0-9]{2}\/[0-9]{2}\/[0-9]{4}$/) !== null;
  }

  getStatutOfevents(DateOfEvent: string) {
    // let current_date = new Date().toLocaleDateString();
    // if (DateOfEvent == current_date) this.statutOfevent = 'Aujourd\'hui';
    if (this.isUpcoming(DateOfEvent)) {
      this.statutOfevent = 'À venir';
    } else {
      this.statutOfevent = 'passé'
    }
    console.log(this.statutOfevent);
    // let newDate = new Date(eventDate1);


  }

  isUpcoming(dateString1: string) {

    // let current_date = new Date().toLocaleDateString('en-GB', { timeZone: 'UTC' });
    // // current_date.setHours(0,0,0,0);
    // let evdate = dateString1;
    // console.log(evdate,' vs ',current_date,evdate > current_date);
    // return evdate > current_date;
    // let current_date = formatDate(new Date(), 'dd/MM/yyyy', 'en');
    // current_date.setHours(0,0,0,0);
    // current_date.setUTCHours(0);
    // let evdate = dateString1;
    // evdate.setUTCHours(0);
    // console.log(evdate, ' vs ', current_date);
    // return evdate > current_date;
    let splitedDate = dateString1.split('/');
    let day = splitedDate[0];
    let month = splitedDate[1];
    let year = splitedDate[2];
    let current_date = new Date();
    current_date.setHours(0, 0, 0, 0);
    console.log(+day,+month,+year);
    let evdate = new Date(+year,3-1, +day);
console.log(evdate);
    return current_date.getTime() < evdate.getTime();


  }
}
