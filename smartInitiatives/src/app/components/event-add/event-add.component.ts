import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { EventsService } from 'src/app/services/events.service';
import { Evnt } from 'src/app/models/Event_';
import { error } from 'selenium-webdriver';
import { startTimeIsBEforeEndTime } from 'src/app/helpers/time-compare.validator';


// const timeCompValidator : ValidatorFn = (formGroup : FormGroup)=>{
//   const start_time = formGroup.get('start_time').value;
//   const end_time = formGroup.get('end_time').value;
//   return start_time !== null && end_time !== null && start_time < end_time ? null : { time: true };
// }


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
    private eventService: EventsService,
    private location : Location
  ) { }

  ngOnInit(): void {
    this.eventFormGroup = this.formBuilder.group({
      title: ["", Validators.required],
      description: ["", Validators.required],
      eventDate: ["", [Validators.required,Validators.pattern(/^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/)]],
      start_time: ["", [Validators.required,Validators.pattern(/^(0[0-9]|1[0-9]|2[0-3]|[0-9]).[0-5][0-9]$/)]],
      end_time: ["", [Validators.required,Validators.pattern(/^(0[0-9]|1[0-9]|2[0-3]|[0-9]).[0-5][0-9]$/)]],
      place: ["", Validators.required]
    },
    {
      validator : startTimeIsBEforeEndTime('start_time','end_time')
    }
    );
  }

  get f() { return this.eventFormGroup.controls; }

  saveEvent() {
    this.submitted = true;
    let tempEvent: Evnt;
    tempEvent = this.eventFormGroup.value;
    if (this.eventFormGroup.invalid) {
      return;
    } else {
      this.eventService.addEvent(tempEvent).subscribe(data => {
        this.location.back();
      }, error => {
        alert("something went wrong!" + error);
      })
    }
  }

  ResetForm() {
    this.eventFormGroup.reset();
  }


}
