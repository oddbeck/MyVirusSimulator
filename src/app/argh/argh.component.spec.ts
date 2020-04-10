import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArghComponent } from './argh.component';

describe('ArghComponent', () => {
  let component: ArghComponent;
  let fixture: ComponentFixture<ArghComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArghComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArghComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
