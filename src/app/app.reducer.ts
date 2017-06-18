import { Observable } from 'rxjs/Observable';
import { compose } from '@ngrx/core/compose';
import { combineReducers } from '@ngrx/store';
import * as fromRouter from '@ngrx/router-store';

import * as fromLocation from './location';

import { environment } from '../environments/environment';

export interface State {
  location: fromLocation.State;
  router: fromRouter.RouterState;
};

export const reducers = {
  location: fromLocation.reducer,
  router: fromRouter.routerReducer,
};

const debugReducer = reducer => {
    return (state, action) => {
        const stateBefore = state;
        const stateAfter = reducer(state, action);
        console.log('[State Debug] state before', stateBefore);
        console.log('[State Debug] action', action);
        console.log('[State Debug] state after', stateAfter);
        return stateAfter;
    };
};

export function reducer(state: any, action: any) {
  if (environment.production) {
    return combineReducers(reducers)(state, action);
  }
  return compose(debugReducer, combineReducers)(reducers)(state, action);
}
