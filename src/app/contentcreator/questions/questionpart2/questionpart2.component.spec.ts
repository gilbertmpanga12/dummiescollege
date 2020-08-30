import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Questionpart2Component } from './questionpart2.component';

describe('Questionpart2Component', () => {
  let component: Questionpart2Component;
  let fixture: ComponentFixture<Questionpart2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Questionpart2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Questionpart2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
