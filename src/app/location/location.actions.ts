import { Action } from '@ngrx/store';

import { Call } from './call';

export const ActionTypes = {
    SHOW_STATE:     '[Location] Show State',
};

export class ShowStateAction implements Action {
    type = ActionTypes.SHOW_STATE;
    payload: { enabledComponent: Call };
    constructor(enabledComponent: Call) {
        this.payload = { enabledComponent };
    }
}

export type Actions
    = ShowStateAction;
