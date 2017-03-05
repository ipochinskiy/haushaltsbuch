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

import { MenuComponent } from './menu.component';

describe('MenuComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        MenuComponent,
      ]
    })
    .compileComponents();
  }));

  let fixture: ComponentFixture<MenuComponent>;
  let cut: MenuComponent;
  let element: any;

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuComponent);
    cut = fixture.debugElement.componentInstance;
    element = fixture.debugElement.nativeElement;
    fixture.detectChanges();
  });

  it('should create the instance', () => {

    assertThat(cut, is(truthy()));
  });

  it('should render accounts', () => {

    assertThat(element, hasProperty('innerText', containsString('Accounts')));
  });

  it('should render budgets', () => {

    assertThat(element, hasProperty('innerText', containsString('Budgets')));
  });
});
