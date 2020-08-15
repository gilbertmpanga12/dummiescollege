import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseintroComponent } from './courseintro.component';

describe('CourseintroComponent', () => {
  let component: CourseintroComponent;
  let fixture: ComponentFixture<CourseintroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourseintroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseintroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
