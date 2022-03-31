/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { MakePostComponent } from './makePost.component';

describe('DashboardComponent', () => {
  let component: MakePostComponent;
  let fixture: ComponentFixture<MakePostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MakePostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MakePostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
