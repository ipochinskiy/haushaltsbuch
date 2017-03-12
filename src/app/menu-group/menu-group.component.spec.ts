import {
  Component,
  EventEmitter,
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
  hasSize,
  allOf,
  not,
  hasItem,
  equalTo,
} from 'hamjest';

import { MenuGroupComponent } from './menu-group.component';

@Component({
  selector: 'hb-menu-entry',
  template: '<div>MENU ENTRY {{label}} {{icon}}</div>',
})
export class TestMenuEntryComponent {
  @Input() icon;
  @Input() label;
}

describe('Component: MenuGroupComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        MenuGroupComponent,
        TestMenuEntryComponent,
      ]
    })
    .compileComponents();
  }));

  let fixture: ComponentFixture<MenuGroupComponent>;
  let cut: MenuGroupComponent;
  let element: any;

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuGroupComponent);
    cut = fixture.debugElement.componentInstance;
    element = fixture.debugElement.nativeElement;
    fixture.detectChanges();
  });

  beforeEach(() => {
    cut.title = 'Bazinga!';
    cut.createItemLabel = 'More bazinga!';
    fixture.detectChanges();
  });

  it('should create the instance', () => {

    assertThat(cut, is(truthy()));
  });

  describe('with "compact" equal to true', () => {
    beforeEach(() => {
      cut.compact = true;
      fixture.detectChanges();
    });

    it('should render only one menu entry', () => {

      assertThat(element.querySelectorAll('hb-menu-entry'), hasSize(1));
    });

    it('should render only the group title', () => {

      assertThat(element, hasProperty('innerText', containsString('MENU ENTRY Bazinga!')));
    });

    it('should NOT render the "createItem" label', () => {

      assertThat(element, hasProperty('innerText', not(containsString('MENU ENTRY More bazinga!'))));
    });

    describe('and after click on the group title', () => {
      beforeEach(() => {
        element.querySelectorAll('hb-menu-entry')[0].dispatchEvent(new MouseEvent('click'));
        fixture.detectChanges();
      });

      it('should render render the "createItem" label as well', () => {
          const valueList = [];

          assertThat(element, hasProperty('innerText', containsString('MENU ENTRY More bazinga!')));
      });
    });
  });

  describe('with "compact" equal to false', () => {
    beforeEach(() => {
      cut.compact = false;
      fixture.detectChanges();
    });

    describe('and with empty "itemList"', () => {
      it('should render two menu entries', () => {

        assertThat(element.querySelectorAll('hb-menu-entry'), hasSize(2));
      });

      it('should render the group title', () => {

        assertThat(element, hasProperty('innerText', containsString('MENU ENTRY Bazinga!')));
      });

      it('should render the "createItem" label', () => {

        assertThat(element, hasProperty('innerText', containsString('MENU ENTRY More bazinga!')));
      });
    });

    describe('and with "itemList" having 4 elements', () => {
      beforeEach(() => {
        cut.itemList = Array(4).fill(null).map((_, i) => generateItem({
          id: i + 1,
          name: `Item ${i + 1}`,
        }));
        fixture.detectChanges();
      });

      it('should render 6 menu entries', () => {

        assertThat(element.querySelectorAll('hb-menu-entry'), hasSize(6));
      });

      it('should render the group title', () => {

        assertThat(element, hasProperty('innerText', containsString('MENU ENTRY Bazinga!')));
      });

      describe('and after click on the group title', () => {
        beforeEach(() => {
          element.querySelectorAll('hb-menu-entry')[0].dispatchEvent(new MouseEvent('click'));
          fixture.detectChanges();
        });

        it('should render only the group title', () => {
            const valueList = [];

            assertThat(element.querySelectorAll('hb-menu-entry'), hasSize(1));
        });
      });

      it('should render names of the items', () => {

        assertThat(element, hasProperty('innerText', allOf(
          containsString('MENU ENTRY Item 1'),
          containsString('MENU ENTRY Item 2'),
          containsString('MENU ENTRY Item 3'),
          containsString('MENU ENTRY Item 4')
        )));
      });

      describe('and after click on an item', () => {

        it('should emit the id of selected item on "selectItem"', () => {
            const valueList = [];

            cut.selectItem.subscribe((value) => valueList.push(value));
            element.querySelectorAll('hb-menu-entry')[4].dispatchEvent(new MouseEvent('click'));

            assertThat(valueList, hasItem(equalTo(4)));
        });
      });

      it('should render the "createItem" label', () => {

        assertThat(element, hasProperty('innerText', containsString('MENU ENTRY More bazinga!')));
      });

      describe('and after click on "createItem" entry', () => {

        it('should emit an event on "createItem"', () => {
            let callCount = 0;

            cut.createItem.subscribe((click) => callCount++);
            element.querySelector('hb-menu-entry:last-child').dispatchEvent(new MouseEvent('click'));

            assertThat(callCount, equalTo(1));
        });
      });
    });
  });
});

function generateItem(options?: any) {
  return Object.assign({
    id: 1,
    name: 'Item',
  }, options);
}
