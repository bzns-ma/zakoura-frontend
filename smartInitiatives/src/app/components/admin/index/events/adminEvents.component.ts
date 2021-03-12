import { Component, OnInit } from '@angular/core';
import { EventsService } from '../../../../services/events.service';
import { Event } from '../../../../models/event';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-admin-events',
  templateUrl: './adminEvents.component.html',
  styleUrls: ['./adminEvents.component.scss']
})
export class AdminEventsComponent implements OnInit {

  events: Event[] = [];
  eventsPage: Event[] = [];
  eventsForm: FormGroup;
  pageSize: number = 10;
  currentPage: number = 1;
  nextPage: number = 2;
  previousPage: number = 1;

  constructor(private api: EventsService, private formBuilder: FormBuilder) {
  
  }

  ngOnInit(): void {
    this.getEvents();
    this.eventsForm = this.formBuilder.group({
      id: ['', Validators.required],
      title: ['', Validators.required],
      photo: ['', Validators.required],
      description: ['', Validators.required],
      category: ['', Validators.required],
      place: ['', Validators.required],
      start_time: ['', Validators.required],
      end_time: ['', Validators.required]
    });
    this.currentPage = 1;
    this.nextPage = 2;
    this.previousPage = 1;
    this.eventsPage = this.events.slice(0, this.pageSize);
  }

  getEvents() {
    this.api.getEvents().subscribe(response => {
      for (const data of response) {
        this.events.push(data);
      }
    });
  }

  add(){
      this.api.addEvent({title: this.eventsForm.get("title"), photo: this.eventsForm.get("photo"), description: this.eventsForm.get("description"),
      start_time: this.eventsForm.get("start_time"), end_time: this.eventsForm.get("end_time"), place: this.eventsForm.get("place")});
  }

  modify(id){
    this.api.updateEvent(id, {id: this.eventsForm.get("id"), title: this.eventsForm.get("title"), photo: this.eventsForm.get("photo"), description: this.eventsForm.get("description"),
    start_time: this.eventsForm.get("start_time"), end_time: this.eventsForm.get("end_time"), place: this.eventsForm.get("place")});
  }

  delete(id){
    this.api.deleteEvent(id);
  }

  toNextPage(){
    if (this.currentPage * this.pageSize < this.events.length) {
      this.previousPage = this.currentPage;
      this.currentPage = this.nextPage;
      this.nextPage = this.nextPage + 1;
      this.eventsPage = this.events.slice(this.pageSize * this.currentPage - this.pageSize, this.pageSize * this.currentPage);
    }
  }

  toPreviousPage(){
    if (this.previousPage - 1 > 0) {
      this.nextPage = this.currentPage;
      this.currentPage = this.previousPage;
      this.previousPage = this.previousPage - 1;
      this.eventsPage = this.events.slice(this.pageSize * this.currentPage - this.pageSize, this.pageSize * this.currentPage);
    }
  }

}
