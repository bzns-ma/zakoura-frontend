import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import { startTimeIsBEforeEndTime } from 'src/app/helpers/time-compare.validator';
import { EventsService } from 'src/app/services/events.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-event-edit',
  templateUrl: './event-edit.component.html',
  styleUrls: ['./event-edit.component.scss']
})
export class EventEditComponent implements OnInit {
  eventFormGroup?: FormGroup;
  eventId: string;
  constructor(
    private formBuilder: FormBuilder,
    private eventService: EventsService,
    private activatedRoute: ActivatedRoute,
    private location: Location
  ) {
    this.eventId = this.activatedRoute.snapshot.params.id;

  }

  ngOnInit(): void {
    this.eventFormGroup = this.formBuilder.group({
      title: ["", Validators.required],
      description: ["", Validators.required],
      eventDate: ["", [Validators.required, Validators.pattern(/^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/)]],
      start_time: ["", [Validators.required, Validators.pattern(/^(0[0-9]|1[0-9]|2[0-3]|[0-9]).[0-5][0-9]$/)]],
      end_time: ["", [Validators.required, Validators.pattern(/^(0[0-9]|1[0-9]|2[0-3]|[0-9]).[0-5][0-9]$/)]],
      place: ["", Validators.required]
    },
      {
        validator: startTimeIsBEforeEndTime('start_time', 'end_time')
      }
    );
    this.eventService.getEventById(this.eventId)
      .pipe(first())
      .subscribe(event => {
        this.eventFormGroup.patchValue(event);
      });
  }

  get f() { return this.eventFormGroup.controls; }

  editEvent() {
    this.eventService.updateEvent(this.eventId, this.eventFormGroup.value).subscribe(res => {
      alert('modification terminé ! ');
      this.location.back();
    });
  }

}
