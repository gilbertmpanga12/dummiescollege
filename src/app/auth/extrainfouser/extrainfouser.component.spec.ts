import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExtrainfouserComponent } from './extrainfouser.component';

describe('ExtrainfouserComponent', () => {
  let component: ExtrainfouserComponent;
  let fixture: ComponentFixture<ExtrainfouserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExtrainfouserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExtrainfouserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
