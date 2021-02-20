import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from "@angular/common";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {

  notAdminPages: boolean;

  constructor(private router: Router, location: Location,) { 
    this.router.events.subscribe(val => {
        this.notAdminPages = !(location.path() === "/admin" || location.path() === "/login");
    }); 
  }

  ngOnInit(): void {}

  scroll(id) {
    const el: HTMLElement | null = document.getElementById(id);
    if (el) {
      el.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
        inline: 'nearest',
      });
    }
  }
}
