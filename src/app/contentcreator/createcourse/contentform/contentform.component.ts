import { Component, OnInit } from '@angular/core';
import { MainService } from 'src/app/services/main.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Course } from 'src/app/services/models';


@Component({
  selector: 'app-contentform',
  templateUrl: './contentform.component.html',
  styleUrls: ['./contentform.component.scss']
})
export class ContentformComponent implements OnInit {
  courseGroup: FormGroup;
  constructor(public service: MainService, private _fb: FormBuilder) { }

  ngOnInit(): void {
    this.courseGroup = this._fb.group({
      title: ['', [Validators.required, Validators.maxLength(30)]],
      caption: ['', [Validators.required, Validators.maxLength(50)]]
    });
  }

  createCourse(): void {
    localStorage.setItem('hasTitle', 'true');
    const payload = <Course>this.courseGroup.getRawValue();
    this.service.createCourse(payload);
    window.location.reload();
    
  }

}
