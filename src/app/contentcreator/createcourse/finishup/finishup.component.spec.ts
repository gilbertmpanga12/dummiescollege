import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FinishupComponent } from './finishup.component';

describe('FinishupComponent', () => {
  let component: FinishupComponent;
  let fixture: ComponentFixture<FinishupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FinishupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FinishupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
