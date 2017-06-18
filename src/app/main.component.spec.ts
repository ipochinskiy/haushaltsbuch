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

import { MainComponent } from './main.component';

@Component({
  selector: 'hb-menu',
  template: '<div>MENU</div>',
})
export class TestMenuComponent {}

describe('MainComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        MainComponent,
        TestMenuComponent,
      ],
    }).compileComponents();
  }));

  let fixture: ComponentFixture<MainComponent>;
  let cut: MainComponent;
  let element: any;

  beforeEach(() => {
    fixture = TestBed.createComponent(MainComponent);
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
