import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  scroll(id) {
    console.log('scrolling to', id);

    // var hash = window.location.hash;
    // if (hash == '' || hash == '#' || hash == undefined) return false;

    const el: HTMLElement|null = document.getElementById(id);

    if (el) {
      setTimeout(() =>
        el.scrollIntoView({behavior: 'smooth', block: 'start', inline: 'nearest'}), 0);
    }
  }

}
