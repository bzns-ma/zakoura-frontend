import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { first } from 'rxjs/operators';

import { AuthenticationService } from '../../../services/authentication.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-admin-login-projects',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    loginForm: FormGroup;
    loading = false;
    submitted = false;
    returnUrl: string;
    error = '';

    isLoggedIn = false;
    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        private tokenStorage: TokenStorageService
    ) { }
    

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });

        if(this.tokenStorage.getToken()){
            this.isLoggedIn = true;
        }
    }

    // convenience getter for easy access to form fields
    get f() { return this.loginForm.controls; }

    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.loginForm.invalid) {
            return;
        }

        this.loading = true;
        
        this.authenticationService.login(this.f.username.value, this.f.password.value)
            .pipe(first())
            .subscribe(
                (data : any) => {
                    this.tokenStorage.saveToken(data.accessToken);
                    this.tokenStorage.saveUser(data);
                    this.tokenStorage.setTimer(Date.now() + (24*60*60*1000)); // session ends in 24h : 24*60*60*1000 
                    this.isLoggedIn = true;
                    this.router.navigateByUrl("/administration")
                    // window.location.reload();
                },
                error => {
                    this.isLoggedIn = false;
                    this.error = error;
                    this.loading = false;
                });
    }

}
