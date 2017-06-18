/* tslint:disable:no-unused-variable */
import {
  TestBed,
  async,
  inject,
  ComponentFixture
} from '@angular/core/testing';
import {
  assertThat,
  is,
  truthy,
  hasProperties
} from 'hamjest';

import { RouterDecrypterService } from './router-decrypter.service';

describe('Service: RouterDecrypterService', () => {
  beforeEach(async(() => {
      TestBed.configureTestingModule({
          providers: [
              RouterDecrypterService,
          ],
      }).compileComponents();
  }));

  let decrypter: RouterDecrypterService;

  beforeEach(inject([
    RouterDecrypterService,
  ], (
    _decrypter
  ) => {
      decrypter = _decrypter;
  }));

  it('should create an instance', () => {

      assertThat(decrypter, is(truthy()));
  });

  describe('cryptComponent()', () => {
    [
        [ 'account', 'a' ],
        [ 'budget', 'b' ],
        [ 'plan', 'p' ],
        [ 'report', 'r' ],
        [ 'something', 'something' ],
    ].forEach(([input, expected]: [string, string]) => {
          it(`should return "${expected}" when called with "${input}"`, () => {

              const actual = decrypter.cryptComponent(input);

              assertThat(actual, is(expected));
          });
      });
  });

  describe('decryptComponent()', () => {
    [
        [ 'a', 'account' ],
        [ 'b', 'budget' ],
        [ 'p', 'plan' ],
        [ 'r', 'report' ],
        [ 'something', 'something' ],
    ].forEach(([input, expected]: [string, string]) => {
          it(`should return "${expected}" when called with "${input}"`, () => {

              const actual = decrypter.decryptComponent(input);

              assertThat(actual, is(expected));
          });
      });
  });
});
