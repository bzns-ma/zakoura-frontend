import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { FormArray, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { EventsService } from 'src/app/services/events.service';
import { Evnt } from 'src/app/models/Event_';
import { error } from 'selenium-webdriver';
import { startTimeIsBEforeEndTime } from 'src/app/helpers/time-compare.validator';
import { FileService } from 'src/app/services/file.service';
import { HttpEventType, HttpResponse } from '@angular/common/http';


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
  urls = [];
  progress = 0;
  message = '';

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private eventService: EventsService,
    private location : Location,
    private fileService: FileService
  ) { }

  ngOnInit(): void {
    this.eventFormGroup = this.formBuilder.group({
      title: ["", Validators.required],
      description: ["", Validators.required],
      eventDate: ["", [Validators.required,Validators.pattern(/^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/)]],
      start_time: ["", [Validators.required,Validators.pattern(/^(0[0-9]|1[0-9]|2[0-3]|[0-9]).[0-5][0-9]$/)]],
      end_time: ["", [Validators.required,Validators.pattern(/^(0[0-9]|1[0-9]|2[0-3]|[0-9]).[0-5][0-9]$/)]],
      place: ["", Validators.required],
      multiImages : [null]
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
        // this.location.back();
      }, error => {
        alert("something went wrong!" + error);
      })
    }
  }

  onFileUpload(event: any) {
    this.urls = [];
    let selectedFiles = event.target.files;
    if (selectedFiles) {
      for (let file of selectedFiles) {
              //
      this.fileService.upload(file).subscribe(
        (event: any) => {
          if (event.type === HttpEventType.UploadProgress) {
            this.progress = Math.round(100 * event.loaded / event.total);
          } else if (event instanceof HttpResponse) {
            this.message = event.body.message;
            // this.fileInfos = this.fileService.getFiles();
          }
        },
        (err: any) => {
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
 
    }
     this.eventFormGroup.patchValue({
        multiImages: this.urls
      });
    
  }

  get multiImages(): FormArray {
    if (this.eventFormGroup && this.eventFormGroup.get('multiImages')) {
      return this.eventFormGroup.get('multiImages') as FormArray;
    }
  } 

  // createImage(img) {
  //   const newImage = new FormControl(img, Validators.required);
  //   (<FormArray>this.eventFormGroup.get('multiImages')).push(newImage)
  // }  

  ResetForm() {
    this.eventFormGroup.reset();
  }


}
