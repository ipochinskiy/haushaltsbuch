import {
  EventEmitter,
  Component,
  Input,
  Output,
} from '@angular/core';
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

@Component({
  selector: 'hb-menu-group',
  template: '<div>MENU GROUP {{title}}</div>',
})
export class TestMenuGroupComponent {
  @Input() createItemLabel: string;
  @Input() icon: string;
  @Input() itemList: string;
  @Input() title: string;

  @Output() createItem: EventEmitter<any> = new EventEmitter<any>();
  @Output() selectItem: EventEmitter<any> = new EventEmitter<any>();
}

describe('MenuComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        MenuComponent,
        TestMenuGroupComponent,
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

    assertThat(element, hasProperty('innerText', containsString('MENU GROUP Accounts')));
  });

  it('should render budgets', () => {

    assertThat(element, hasProperty('innerText', containsString('MENU GROUP Budgets')));
  });
});
