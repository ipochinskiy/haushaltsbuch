/* tslint:disable:no-unused-variable */
import {
    async,
    inject,
    ComponentFixture,
    TestBed,
} from '@angular/core/testing';
import {
    Store,
    StoreModule,
} from '@ngrx/store';
import {
    EffectsTestingModule,
    EffectsRunner,
} from '@ngrx/effects/testing';
import {
    assertThat,
    is,
    truthy,
    hasProperties,
    hasProperty,
    contains,
    hasSize,
    allOf,
    instanceOf,
} from 'hamjest';
import {
    stub,
    SinonStub,
} from 'sinon';
import * as fromRouter from '@ngrx/router-store';

import {
  wasCalled,
  MockService,
  MockServiceProvider,
} from '../../test';

import { LocationDecrypterService } from '../location-decrypter.service';
import * as fromLocation from '../location.actions';

import { UpdateLocationEffects } from './update-location';

describe('Effects: UpdateLocationEffects', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        EffectsTestingModule,
      ],
      providers: [
        UpdateLocationEffects,
        { provide: LocationDecrypterService, useValue: MockServiceProvider.with('decryptCall') },
      ],
    }).compileComponents();
  }));

  let runner: EffectsRunner;
  let eut: UpdateLocationEffects;
  let decrypter: MockService;

  beforeEach(inject([
    EffectsRunner,
    UpdateLocationEffects,
    LocationDecrypterService,
  ], (
    _runner,
    locationChangeEffects,
    serviceMock: MockService
  ) => {
    runner = _runner;
    eut = locationChangeEffects;
    decrypter = serviceMock;
  }));

  it('should create an instance', () => {

    assertThat(eut, is(truthy()));
  });

  describe('change$', () => {
    beforeEach(() => {
      decrypter['decryptCall'].returns({ component: 'foo', params: [ 'bar', 'baz', 'bap' ] });
    });

    it('should call "decryptCall" on the decrypter', () => {

      runner.queue({ type: fromRouter.routerActions.UPDATE_LOCATION, payload: { path: 'foo' } });
      eut.change$.subscribe(() => {});

      assertThat(decrypter['decryptCall'], wasCalled(1).withArgs('foo'));
    });

    it('should dispatch a ShowStateAction', () => {
      const resultList = [];

      runner.queue({ type: fromRouter.routerActions.UPDATE_LOCATION, payload: { path: 'foo' } });
      eut.change$.subscribe(value => resultList.push(value));

      assertThat(resultList, contains(allOf(
        instanceOf(fromLocation.ShowStateAction),
        hasProperty('payload', hasProperty(
          'enabledComponent',
          hasProperties({
            component: 'foo',
            params: contains(
              'bar',
              'baz',
              'bap'
            )
          })
        ))
      )));
    });
  });
});
