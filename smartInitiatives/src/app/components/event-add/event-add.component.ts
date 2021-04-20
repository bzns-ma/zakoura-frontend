import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EventsService } from 'src/app/services/events.service';
import { Event } from 'src/app/models/Event_';
import { error } from 'selenium-webdriver';
@Component({
  selector: 'app-event-add',
  templateUrl: './event-add.component.html',
  styleUrls: ['./event-add.component.scss']
})
export class EventAddComponent implements OnInit {
  eventFormGroup?: FormGroup;
  submitted = false;
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private eventService: EventsService
  ) { }

  ngOnInit(): void {
    this.eventFormGroup = this.formBuilder.group({
      title: ["", Validators.required],
      description: ["", Validators.required],
      eventDate: ["", Validators.required],
      start_time: ["", [Validators.required,Validators.pattern(/^(0[0-9]|1[0-9]|2[0-3]|[0-9]):[0-5][0-9]$/)]],
      end_time: ["", [Validators.required,Validators.pattern(/^(0[0-9]|1[0-9]|2[0-3]|[0-9]):[0-5][0-9]$/)]],
      place: ["", Validators.required]
    });
  }

  get f() { return this.eventFormGroup.controls; }

  saveEvent() {
    this.submitted = true;
    let tempEvent: Event;
    tempEvent = this.eventFormGroup.value;
    if (this.eventFormGroup.invalid) {
      return;
    } else {
      this.eventService.addEvent(tempEvent).subscribe(data => {
        this.router.navigateByUrl("/administration")
      }, error => {
        alert("something went wrong!" + error);
      })
    }
  }

  ResetForm() {
    this.eventFormGroup.reset();

  }


}
