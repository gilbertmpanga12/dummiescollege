import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MainService {
  year: Date = new Date();
  fullYear: number = this.year.getFullYear();
  isLoading: boolean = false;
  constructor() { 
   
  }

}
