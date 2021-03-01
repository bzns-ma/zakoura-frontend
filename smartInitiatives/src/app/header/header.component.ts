import { Component, OnInit, ElementRef } from '@angular/core';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { ActivatedRoute, Router } from '@angular/router';
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

  constructor(private route: ActivatedRoute,private router: Router, location: Location) { 
    this.router.events.subscribe(val => {
        this.notAdminPages = !(location.path() === "/admin" || location.path() === "/login");
    }); 
  }

  ngOnInit(): void { 
      
  }

  onClickAnchor(){
    this.route.fragment.subscribe ( frg => {
      const elm = document.querySelector ( "#" + frg )
      if ( elm ) elm.scrollIntoView();
    });
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
    alert("Copied the text: " + val);
    document.body.removeChild(selBox);
  }

}
