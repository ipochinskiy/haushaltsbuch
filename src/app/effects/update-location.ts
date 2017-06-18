import { Injectable } from '@angular/core';
import {
  toPayload,
  Actions,
  Effect,
} from '@ngrx/effects';
import {
  Action,
  Store,
} from '@ngrx/store';
import {
  Observable,
  BehaviorSubject,
  Subject
} from 'rxjs/Rx';
import { empty } from 'rxjs/observable/empty';
import { of } from 'rxjs/observable/of';
import * as fromRouter from '@ngrx/router-store';

import * as fromApp from '../app.actions';

import { Call } from '../call';

import { RouterDecrypterService } from '../router-decrypter.service';

@Injectable()
export class UpdateLocationEffects {

  @Effect()
  change$: Observable<Action> = this.actions$
    .ofType(fromRouter.routerActions.UPDATE_LOCATION)
    .map(toPayload)
    .map((payload: { path: string }) => {
      const call = this.decrypter.decryptCall(payload.path);
      return new fromApp.ShowStateAction(call);
    });

  constructor(
    private actions$: Actions,
    private decrypter: RouterDecrypterService
  ) {
  }
}
