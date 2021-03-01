import { Component, OnInit } from '@angular/core';
import { Events } from 'src/app/models/events';
import { EventsService } from 'src/app/services/events.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {
events : Events[];
lfCard : any;
  constructor(private api: EventsService) { }

  ngOnInit(): void {
this.api.getActivities().subscribe(dataevent =>{
  this.events = dataevent.body;
});
  }

  getlfCard(){
    return this.lfCard = (Math.random()>=0.5)?'fl-left' :'fl-right';
  }

}
