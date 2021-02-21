import { Component, OnInit, ElementRef } from '@angular/core';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { Router } from '@angular/router';
import { Location } from "@angular/common";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  nbr = "06 12001200";
  currentRoute: string;
  notAdminPages: boolean;

  constructor(private router: Router, location: Location,) { 
    this.router.events.subscribe(val => {
        this.notAdminPages = !(location.path() === "/admin" || location.path() === "/login");
    }); 
  }

  ngOnInit(): void { 
      
  }

  copyNumber(val: string) {
    let selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = val;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
  }

}
