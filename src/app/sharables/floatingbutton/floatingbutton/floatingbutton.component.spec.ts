import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FloatingbuttonComponent } from './floatingbutton.component';

describe('FloatingbuttonComponent', () => {
  let component: FloatingbuttonComponent;
  let fixture: ComponentFixture<FloatingbuttonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FloatingbuttonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FloatingbuttonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
