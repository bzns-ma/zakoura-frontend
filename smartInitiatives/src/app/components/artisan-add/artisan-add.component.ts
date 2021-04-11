import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { error } from 'selenium-webdriver';
import { ArtisanService } from 'src/app/services/artisan.service';
import { FileService } from 'src/app/services/file.service';
import { Artisan } from '../../models/artisan';
@Component({
  selector: 'app-artisan-add',
  templateUrl: './artisan-add.component.html',
  styleUrls: ['./artisan-add.component.scss']
})
export class ArtisanAddComponent implements OnInit {
  artisanFormGroup?: FormGroup;
  selectedFiles?: FileList;
  currentFile?: File;
  progress = 0;
  message = '';
  submitted = false;
  fileInfos?: Observable<any>;

  constructor(
    private formBuilder: FormBuilder,
    private artisanApi: ArtisanService,
    private router: Router,
    private fileService: FileService
  ) { }

  ngOnInit(): void {
    this.artisanFormGroup = this.formBuilder.group({
      first_name: ["", Validators.required],
      last_name: ["", Validators.required],
      title: ["", Validators.required],
      description: [""],
      membership: [false, Validators.required],
      photo: [""],
      website: [""],
      facebook: [""],
      phone_number: [""],
      email: ["", [Validators.required,Validators.email]]

    });
    // this.fileInfos = this.fileService.getFiles();

  }

      // convenience getter for easy access to form fields
      get f() { return this.artisanFormGroup.controls; }


  saveArtisan() {
    this.submitted = true;
    let tempArtisan: Artisan;
    tempArtisan = this.artisanFormGroup.value;
    this.upload();
    if (this.artisanFormGroup.invalid) {
      return;
    } else {
      this.artisanApi.addArtisan(tempArtisan).subscribe(res => {
        this.router.navigateByUrl("/administration")
      }, error => {
        alert("something went wrong!")
      });
    }
  }

  selectFile(event: any): void {
    this.selectedFiles = event.target.files;
  }

  upload(): void {
    this.progress = 0;

    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);

      if (file) {
        this.currentFile = file;

        this.fileService.upload(this.currentFile).subscribe(
          (event: any) => {
            if (event.type === HttpEventType.UploadProgress) {
              this.progress = Math.round(100 * event.loaded / event.total);
            } else if (event instanceof HttpResponse) {
              this.message = event.body.message;
              console.log('this.currentFile.name', this.currentFile.name);
              this.artisanFormGroup.value['photo'] = this.currentFile.name || '';

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

            this.currentFile = undefined;
          });
      }

      this.selectedFiles = undefined;
    }
  }

  ResetForm() {
    this.submitted = false;
    this.artisanFormGroup.reset();
  }

}
