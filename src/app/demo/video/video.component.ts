import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { MainService } from 'src/app/services/main.service';
import { Router } from '@angular/router';
import videojs from 'video.js';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss']
})
export class VideoComponent implements OnInit {
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
      private service: MainService,
      private router: Router
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
