import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentcreatorComponent } from './contentcreator.component';

describe('ContentcreatorComponent', () => {
  let component: ContentcreatorComponent;
  let fixture: ComponentFixture<ContentcreatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContentcreatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentcreatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
