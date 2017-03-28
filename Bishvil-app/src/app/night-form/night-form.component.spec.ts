/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { NightFormComponent } from './night-form.component';

describe('NightFormComponent', () => {
  let component: NightFormComponent;
  let fixture: ComponentFixture<NightFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NightFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NightFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
