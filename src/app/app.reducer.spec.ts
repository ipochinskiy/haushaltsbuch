/* tslint:disable:no-unused-variable */
import * as _ from 'lodash';

import {
    assertThat,
    hasProperty,
    hasProperties,
    is,
    not,
    allOf,
    hasItem,
    strictlyEqualTo,
    contains,
    isEmpty,
    hasSize,
    instanceOf,
    defined,
} from 'hamjest';

import * as fromApp from './app.actions';
import {
    reducer,
    State,
} from './app.reducer';

describe('Reducer: Resources', () => {
  describe('for ShowStateAction', () => {
    it('should add resources to store', () => {
      const initialState: State = undefined;

      const state: State = reducer(initialState, new fromApp.ShowStateAction({
        component: 'account',
        params: [ '1234', 'show=list' ],
      }));

      assertThat(state, hasProperty(
        'enabledComponent',
        hasProperties({
          component: 'account',
          params: contains(
            '1234',
            'show=list'
          ),
        })
      ));
    });
  });
});

function createState(options?): State {
  return <State>_.assign({
    enabledComponent: {
      component: 'account',
      params: [ '1234', 'show=list' ],
    },
  }, options);
}
