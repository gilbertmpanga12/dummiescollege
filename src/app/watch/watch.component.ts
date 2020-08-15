import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-watch',
  templateUrl: './watch.component.html',
  styleUrls: ['./watch.component.scss']
})
export class WatchComponent implements OnInit {
  test: string[] = ["Chapter 1", "Chapter 2", 
  "Chapter 3", "Chapter 4",
  "Chapter 5", "Chapter 6", "Chapter 7", "Chapter 8", "Chapter 9", "Chapter 10"];
  constructor() { }

  ngOnInit(): void {
    // const tag = document.createElement('script');

    // tag.src = "https://www.youtube.com/iframe_api";
    // document.body.appendChild(tag);
  }

}
