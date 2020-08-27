import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentformComponent } from './contentform.component';

describe('ContentformComponent', () => {
  let component: ContentformComponent;
  let fixture: ComponentFixture<ContentformComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContentformComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
