import { Component, ElementRef, Input, OnDestroy, OnInit, 
  ViewChild, ViewEncapsulation } from '@angular/core';
import videojs from 'video.js';
import { MainService } from 'src/app/services/main.service';

@Component({
  selector: 'app-vjs-player',
  templateUrl: './vjs-player.component.html',
  styleUrls: ['./vjs-player.component.scss']
})
export class VjsPlayerComponent implements OnInit {
  watching: boolean = true;
  @ViewChild('target', {static: true}) target: ElementRef;
  // see options: https://github.com/videojs/video.js/blob/mastertutorial-options.html
  @Input() options: {
      fluid: boolean,
      aspectRatio: string,
      autoplay: boolean,
      sources: {
          src: string,
          type: string,
      }[],
      responsive: boolean,
      muted: boolean
  };
  player: videojs.Player;

  constructor(
    private elementRef: ElementRef,
    private service: MainService
  ) { }

  ngOnInit() {
    // instantiate Video.js
   
    this.player = videojs(this.target.nativeElement, this.options, function onPlayerReady() {
      let player = this;
      player.on('ended', function() {
      return this;
      });

    });

    this.player.on('ended', ref => {
      this.service.hasWatched = true;
    });
    
  }
  

  ngOnDestroy() {
    // destroy player
    if (this.player) {
      this.player.dispose();
    }
  }

}
