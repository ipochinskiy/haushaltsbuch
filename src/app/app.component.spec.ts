import { Component } from '@angular/core';
import {
  async,
  ComponentFixture,
  TestBed,
} from '@angular/core/testing';

import {
  assertThat,
  is,
  truthy,
  hasProperty,
  containsString,
} from 'hamjest';

import { AppComponent } from './app.component';

@Component({
  selector: 'hb-menu',
  template: '<div>MENU</div>',
})
export class TestMenuComponent {}

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        TestMenuComponent,
      ],
    }).compileComponents();
  }));

  let fixture: ComponentFixture<AppComponent>;
  let cut: AppComponent;
  let element: any;

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    cut = fixture.debugElement.componentInstance;
    element = fixture.debugElement.nativeElement;
    fixture.detectChanges();
  });

  it('should create the instance', () => {

    assertThat(cut, is(truthy()));
  });

  it('should render the menu', () => {

    assertThat(element, hasProperty('innerText', containsString('MENU')));
  });
});
