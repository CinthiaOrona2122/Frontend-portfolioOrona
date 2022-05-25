import { Component, Inject, OnInit } from '@angular/core';
import { APP_BASE_HREF } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{  
  title = 'Portfolio-Orona-Cinthia';

  constructor(     
    @Inject(APP_BASE_HREF) private baseHref: string) {
    var a = this.baseHref;
    console.log(a, " is base HREF")
     }

  ngOnInit(): void {
  }
}