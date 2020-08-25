import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentcreatordashComponent } from './contentcreatordash.component';

describe('ContentcreatordashComponent', () => {
  let component: ContentcreatordashComponent;
  let fixture: ComponentFixture<ContentcreatordashComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContentcreatordashComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentcreatordashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
