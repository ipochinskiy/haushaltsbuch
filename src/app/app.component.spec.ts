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

/* tslint:disable */
@Component({
    selector: 'router-outlet',
    template: 'ROUTER-OUTLET',
})
class DummyRouterOutletComponent {}
/* tslint:enable */

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        DummyRouterOutletComponent,
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
});
