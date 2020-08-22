import { Directive, ElementRef, HostListener } from '@angular/core';
import { MainService } from '../services/main.service';

@Directive(
    {
        selector: '[appDropDownMenu]'
    }
)

export class DropDownMenu {
    constructor(private el: ElementRef, private service: MainService){
       
    }
    
    // @HostListener('mouseenter') onMouseEnter(){
    //     this.service.showMobileMenu = true;
    // }

    @HostListener('mouseleave') onClick(){
        //this.animate('transition ease-in duration-75');
        this.service.showMobileMenu = false
    }   

    // private animate(animationclass: string) {
    //    this.el.nativeElement.className = '';
    // }
}