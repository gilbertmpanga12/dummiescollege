import { Component, OnInit } from '@angular/core';
import { MainService } from '../services/main.service';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { Skills, Certificates } from '../services/models';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  $skills: Observable<Skills[]>;
  $certificates: Observable<Certificates[]>;

  constructor(public service: MainService,  private toastr: ToastrService, 
    private af:  AngularFirestore) { 
    this.$skills = this.af.collection('users')
    .doc(service.userId).collection<Skills>('skills').valueChanges();
    this.$certificates = this.af.collection('users').doc(service.userId)
    .collection<Certificates>('certificates').valueChanges();
  }

  ngOnInit(): void {
  }

  logout(): void{
    this.service.showMobileMenu = false;
    this.service.logout();
    this.toastr.info('You\'ve been signed out','');
    window.location.reload();
  }

}
