import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { first, map } from 'rxjs/operators';
import { ArtisanService } from 'src/app/services/artisan.service';
import { FileService } from 'src/app/services/file.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-artisan-edit',
  templateUrl: './artisan-edit.component.html',
  styleUrls: ['./artisan-edit.component.scss']
})
export class ArtisanEditComponent implements OnInit {
  artisanId: string;
  modificationForm: FormGroup;
  selectedFiles?: FileList;
  currentFile?: File;
  progress = 0;
  message = '';
  submitted = false;
  fileInfos?: Observable<any>;
  imageUrl: any = '';

  constructor(
    private activatedRoute: ActivatedRoute,
    private ArtisanService: ArtisanService,
    private fileService: FileService,
    private router: Router,
    private location: Location,
    private formBuilder: FormBuilder) {
    this.artisanId = this.activatedRoute.snapshot.params.id;
  }

  ngOnInit(): void {
    this.modificationForm = this.formBuilder.group({
      first_name: ["", Validators.required],
      last_name: ["", Validators.required],
      title: ["", Validators.required],
      description: [""],
      membership: [false, Validators.required],
      photoUrl: [null],
      website: [""],
      facebook: [""],
      phone_number: [""],
      email: ["", [Validators.required, Validators.email]]
    });

    this.ArtisanService.getArtisan(this.artisanId)
      .pipe(first())
      .subscribe(artisan => {
        this.modificationForm.patchValue(artisan);
        this.imageUrl = artisan.photoUrl;
      });
  }


  // convenience getter for easy access to form fields
  get f() { return this.modificationForm.controls; }

  modifyArtisan() {
    this.ArtisanService.updateArtisan(this.artisanId, this.modificationForm.value).subscribe(data => {
      alert('modification terminé ! ');
      this.location.back();
    });
  }

  selectFile(event: any): void {
    let reader = new FileReader(); // HTML5 FileReader API
    this.selectedFiles = event.target.files;
    let filepreview = this.selectedFiles.item(0);
    if (this.selectedFiles && filepreview) {
      reader.readAsDataURL(filepreview);
      // When file uploads set it to file formcontrol
      reader.onload = () => {
        this.imageUrl = reader.result;
        this.modificationForm.patchValue({
          photoUrl: reader.result
        });
        // this.editFile = false;
        // this.removeUpload = true;
      }
    }
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
              this.modificationForm.value['photoUrl'] = this.currentFile.name || '';

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

            this.currentFile = undefined;
          });
      }

      this.selectedFiles = undefined;
    }
  }

}
