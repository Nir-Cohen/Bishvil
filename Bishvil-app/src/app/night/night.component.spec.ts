/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { NightComponent } from './night.component';

describe('NightComponent', () => {
  let component: NightComponent;
  let fixture: ComponentFixture<NightComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NightComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
