import { Observable } from 'rxjs/Observable';
import '@ngrx/core/add/operator/select';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/let';
import * as _ from 'lodash';

import { Call } from './call';

import * as actions from './app.actions';

export interface State {
  enabledComponent: Call,
}

const initialState: State = {
  enabledComponent: null,
};

export function reducer(state = initialState, action: actions.Actions): State {
  switch (action.type) {
    case actions.ActionTypes.SHOW_STATE:
      const { enabledComponent } = (<actions.ShowStateAction>action).payload;
      return <State>_.assign({}, state, { enabledComponent });
    default:
      return state;
  }
}

export function getEnabledComponent(state$: Observable<any>): Observable<string> {
  return state$.select(state => state.enabledComponent);
}
