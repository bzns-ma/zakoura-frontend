import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { Evnt } from 'src/app/models/Event_';
import { EventsService } from 'src/app/services/events.service';
import { CarouselComponent } from 'src/app/shared/carousel/carousel.component';
import { Slide } from 'src/app/shared/carousel/carousel.interface';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.scss'],
  providers: [DatePipe]

})
export class EventDetailsComponent implements OnInit {
  eventId: string;
  no_image = true;
  eventDetail: Evnt;
  now = new Date();
  current_date = '';
  @ViewChild(CarouselComponent) carousel: CarouselComponent;
  slides: Slide[] = [];
  constructor(
    private eventService: EventsService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private datePipe: DatePipe,

  ) {
    this.eventId = this.activatedRoute.snapshot.params.id;
  }

  ngOnInit(): void {
    this.current_date = this.datePipe.transform(this.now, 'dd/MM/yyyy');

  }
  ngAfterViewInit(): void {
    this.eventService.getEventById(this.eventId)
      .subscribe(event => {
        this.eventDetail = event;
        if (this.eventDetail.multiImages && this.eventDetail.multiImages.length > 0) {
          this.eventDetail.multiImages.forEach(img => {
            this.slides.push({ src: img });
            this.no_image = false;
          });
        }
      });
  }
  displayedTime(time?: string) {
    if (time) {
      let st = time.split('.');
      return st[0] + 'h' + st[1];
    }
    else return '';
  }

  dayToEvent(date_event) {
    let d = this.now.getTime();
    let dd = Date.parse(this.changePositionOfDaysAndMonth(date_event));
    return this.dateInDays(dd) - this.dateInDays(d);
  }

  changePositionOfDaysAndMonth(date_event) {
    let s = date_event.split('/');
    return s[1] + "/" + s[0] + '/' + s[2]
  }

  dateInDays(date) {
    return Math.abs(Math.round(date / (1000 * 60 * 60 * 24)));
  }
}
