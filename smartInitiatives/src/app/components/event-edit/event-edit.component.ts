import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import { startTimeIsBEforeEndTime } from 'src/app/helpers/time-compare.validator';
import { EventsService } from 'src/app/services/events.service';
import { Location } from '@angular/common';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { FileService } from 'src/app/services/file.service';

@Component({
  selector: 'app-event-edit',
  templateUrl: './event-edit.component.html',
  styleUrls: ['./event-edit.component.scss']
})
export class EventEditComponent implements OnInit {
  eventFormGroup?: FormGroup;
  eventId: string;
  imageUrls : String[] = [];
  urls = [];
  progress = 0;
  message = '';

  
  constructor(
    private formBuilder: FormBuilder,
    private eventService: EventsService,
    private activatedRoute: ActivatedRoute,
    private location: Location,
    private fileService: FileService
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
      place: ["", Validators.required],
      multiImages : [null]
    },
      {
        validator: startTimeIsBEforeEndTime('start_time', 'end_time')
      }
    );
    this.eventService.getEventById(this.eventId)
      .pipe(first())
      .subscribe(event => {
        this.eventFormGroup.patchValue(event);
        this.imageUrls = event.multiImages;
        console.log('this.imageUrls=',this.imageUrls)
        console.log('event',event);
        console.log('eventFormGroup',this.eventFormGroup.value)
      });
  }

  get f() { return this.eventFormGroup.controls; }

  editEvent() {
    this.eventService.updateEvent(this.eventId, this.eventFormGroup.value).subscribe(res => {
      alert('modification terminé ! ');
      this.location.back();
    });
  }

  onFileUpload(event: any) {
    this.urls = [];
    let selectedFiles = event.target.files;
    if (selectedFiles) {
      for (let file of selectedFiles) {
              //
      this.fileService.upload(file).subscribe(
        (event: any) => {
          // console.log(event);
          if (event.type === HttpEventType.UploadProgress) {
            this.progress = Math.round(100 * event.loaded / event.total);
          } else if (event instanceof HttpResponse) {
            this.message = event.body.message;
            // this.fileInfos = this.fileService.getFiles();
          }
        },
        (err: any) => {
          console.log(err);
          this.progress = 0;
          if (err.error && err.error.message) {
            this.message = err.error.message;
          } else {
            this.message = 'Could not upload the file!';
          }
        });
      //
        let reader = new FileReader();
        reader.onload = (e: any) => {
          this.urls.push(e.target.result);
          // this.createImage(e.target.result);
        }
        reader.readAsDataURL(file);
      }
      console.log(this.urls);
 
    }
     this.eventFormGroup.patchValue({
        multiImages: this.urls
      });
    // console.log(this.urls);
    console.log(this.eventFormGroup.value);
    
  }

}
