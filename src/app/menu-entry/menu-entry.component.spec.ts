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
  hasSize,
  equalTo,
} from 'hamjest';

import { MenuEntryComponent } from './menu-entry.component';

describe('Component: MenuEntryComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        MenuEntryComponent,
      ]
    })
    .compileComponents();
  }));

  let fixture: ComponentFixture<MenuEntryComponent>;
  let cut: MenuEntryComponent;
  let element: any;

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuEntryComponent);
    cut = fixture.debugElement.componentInstance;
    element = fixture.debugElement.nativeElement;
    fixture.detectChanges();
  });

  it('should create the instance', () => {

    assertThat(cut, is(truthy()));
  });

  it('should render the label', () => {
    cut.label = 'Foo';
    fixture.detectChanges();

    assertThat(element, hasProperty('innerText', containsString('Foo')));
  });

  it('should render the icon', () => {
    cut.icon = 'bazinga';
    cut.ngOnChanges();
    fixture.detectChanges();

    assertThat(element.querySelectorAll('.icon--bazinga'), hasSize(1));
  });

  it('should emit an event when clicked', () => {
    let callCount = 0;

    cut.click.subscribe((event) => callCount++);
    element.children[0].dispatchEvent(new MouseEvent('click'));

    assertThat(callCount, equalTo(1));
  });

  describe('with "active" property set', () => {
    beforeEach(() => {
      cut.active = true;
      cut.ngOnChanges();
      fixture.detectChanges();
    });

    it('should amend class list', () => {

      assertThat(element.querySelectorAll('.entry--active'), hasSize(1));
    });
  });
});
