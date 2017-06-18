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

import { Call } from './call';

import { LocationDecrypterService } from './location-decrypter.service';

describe('Service: LocationDecrypterService', () => {
  beforeEach(async(() => {
      TestBed.configureTestingModule({
          providers: [
              LocationDecrypterService,
          ],
      }).compileComponents();
  }));

  let sut: LocationDecrypterService;

  beforeEach(inject([
    LocationDecrypterService,
  ], (
    _decrypter
  ) => {
      sut = _decrypter;
  }));

  it('should create an instance', () => {

      assertThat(sut, is(truthy()));
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

        const actual = sut.cryptComponent(input);

        assertThat(actual, is(expected));
      });
    });
  });

  describe('decryptCall()', () => {
    [
      [ '/',                            { component: 'account', params: [] } ],
      [ '/a/1234',                      { component: 'account', params: [ '1234' ] } ],
      [ '/a/1234?show=list',            { component: 'account', params: [ '1234', 'show=list' ] } ],
      [ '/a/1234?show=list&command=add', { component: 'account', params: [ '1234', 'show=list', 'command=add' ] } ],
      [ '/b/1234',                      { component: 'budget',  params: [ '1234' ] } ],
      [ '/b/1234?show=list',            { component: 'budget',  params: [ '1234', 'show=list' ] } ],
      [ '/b/1234?show=list&command=add', { component: 'budget',  params: [ '1234', 'show=list', 'command=add' ] } ],
      [ '/p/1234',                      { component: 'plan',    params: [ '1234' ] } ],
      [ '/p/1234?show=list',            { component: 'plan',    params: [ '1234', 'show=list' ] } ],
      [ '/p/1234?show=list&command=add', { component: 'plan',    params: [ '1234', 'show=list', 'command=add' ] } ],
      [ '/r/1234',                      { component: 'report',  params: [ '1234' ] } ],
      [ '/r/1234?show=list',            { component: 'report',  params: [ '1234', 'show=list' ] } ],
      [ '/r/1234?show=list&command=add', { component: 'report',  params: [ '1234', 'show=list', 'command=add' ] } ],
    ].forEach(([ path, expected ]: [ string, Call ]) => {
      describe(`when given path equal to "${path}"`, () => {
        it(`should return "${JSON.stringify(expected)}"`, () => {

          const call: Call = sut.decryptCall(path);

          assertThat(call, hasProperties(expected));
        });
      });
    });
  });
});
