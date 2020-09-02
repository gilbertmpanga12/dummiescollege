import { Component, OnInit } from '@angular/core';
import { MainService } from '../services/main.service';
import { Observable } from 'rxjs';
import { Notifcations } from '../services/models';
import {
  AngularFirestoreCollection,
  AngularFirestore,
} from '@angular/fire/firestore';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss'],
})
export class NotificationsComponent implements OnInit {
  notification$: Observable<Notifcations[]>;
  notifications: AngularFirestoreCollection<Notifcations>;
  unread: string = `
  relative transform scale-100  
 text-xs py-1 border-b-2 border-blue-100 cursor-default 
  bg-blue-500 bg-opacity-25
 `;
  read: string = `
  relative transform scale-100  
  text-xs py-1 border-b-2 border-blue-100 cursor-default 
  bg-opacity-25 bg-white
 `;
  constructor(public service: MainService, private af: AngularFirestore) {}

  ngOnInit(): void {
    this.notifications = this.af
      .collection('users')
      .doc(this.service.userId)
      .collection<Notifcations>('notifications');
    this.notification$ = this.notifications.valueChanges();
  }

   publishedAt(date:number){
     return `${new Date(date)}`.substring(0,10)
   }
}
