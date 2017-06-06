/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Confirm2Component } from './confirm2.component';

describe('Confirm2Component', () => {
  let component: Confirm2Component;
  let fixture: ComponentFixture<Confirm2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Confirm2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Confirm2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
