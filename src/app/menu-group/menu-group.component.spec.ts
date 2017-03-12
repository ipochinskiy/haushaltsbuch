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
  @Input() active;
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
    fixture.detectChanges();
  });

  it('should create the instance', () => {

    assertThat(cut, is(truthy()));
  });

  it('should render the group title', () => {

    assertThat(element, hasProperty('innerText', containsString('Bazinga!')));
  });

  describe('with "compact" equal to true', () => {
    beforeEach(() => {
      cut.compact = true;
      fixture.detectChanges();
    });

    describe('and with "createItemLabel"', () => {
      beforeEach(() => {
        cut.createItemLabel = 'More bazinga!';
        fixture.detectChanges();
      });

      it('should NOT render any menu entry', () => {

        assertThat(element.querySelectorAll('hb-menu-entry'), hasSize(0));
      });

      it('should NOT render the "createItemLabel"', () => {

        assertThat(element, hasProperty('innerText', not(containsString('More bazinga!'))));
      });

      describe('and after click on the group title', () => {
        beforeEach(() => {
          element.querySelector('.group__title').dispatchEvent(new MouseEvent('click'));
          fixture.detectChanges();
        });

        it('should render the "createItemLabel" as well', () => {

            assertThat(element, hasProperty('innerText', containsString('More bazinga!')));
        });
      });
    });
  });

  describe('with "compact" equal to false', () => {
    beforeEach(() => {
      cut.compact = false;
      fixture.detectChanges();
    });

    describe('and with empty "itemList"', () => {
      beforeEach(() => {
        cut.itemList = [];
        fixture.detectChanges();
      });

      describe('should render the "createItemLabel"', () => {
        beforeEach(() => {
          cut.createItemLabel = 'More bazinga!';
          fixture.detectChanges();
        });

        it('should render the "createItemLabel"', () => {

          assertThat(element, hasProperty('innerText', containsString('More bazinga!')));
        });
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

      it('should render 4 menu entries', () => {

        assertThat(element.querySelectorAll('hb-menu-entry'), hasSize(4));
      });

      describe('and after click on the group title', () => {
        beforeEach(() => {
          element.querySelector('.group__title').dispatchEvent(new MouseEvent('click'));
          fixture.detectChanges();
        });

        it('should not render any menu item', () => {

            assertThat(element.querySelectorAll('hb-menu-entry'), hasSize(0));
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
            element.querySelectorAll('hb-menu-entry')[2].dispatchEvent(new MouseEvent('click'));

            assertThat(valueList, hasItem(equalTo(3)));
        });
      });

      describe('and with "createItemLabel"', () => {
        beforeEach(() => {
          cut.createItemLabel = 'More bazinga!';
          fixture.detectChanges();
        });

        it('should render the "createItemLabel"', () => {

          assertThat(element, hasProperty('innerText', containsString('More bazinga!')));
        });

        describe('and after click on "createItem" entry', () => {

          it('should emit an event on "createItem"', () => {
              let callCount = 0;

              cut.createItem.subscribe((click) => callCount++);
              element.querySelector('.group__footer').dispatchEvent(new MouseEvent('click'));

              assertThat(callCount, equalTo(1));
          });
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
