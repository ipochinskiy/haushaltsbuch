import { Injectable } from '@angular/core';
import * as _ from 'lodash';

import { Call } from './call';

const COMPONENT_LIST = {
    'a': 'account',
    'b': 'budget',
    'p': 'plan',
    'r': 'report',
};
const COMPONENT_LIST_REVERSE = {
  'account': 'a',
  'budget': 'b',
  'plan': 'p',
  'report': 'r',
};
const DEFAULT_COMPONENT = 'account';

@Injectable()
export class LocationDecrypterService {
  cryptComponent(long: string): string {
    return COMPONENT_LIST_REVERSE[long] || long;
  }

  decryptCall(path: string): Call {
    const [ decodedComponent, encodedParamString ]: [string, string] = splitPath(path);
    const decodedParamString = decodeURIComponent(encodedParamString);
    const component: string = decryptComponent(decodedComponent);
    const params = decodedParamString ? decodedParamString.split(/\?|%3F|#|%23|&|%3D/) : [];
    return { component, params };
  }
}

function splitPath(path: string): [string, string] {
  const pathSplits = _.drop(path.split('/'), 1);
  if (!pathSplits || pathSplits.length < 2) {
    return [ DEFAULT_COMPONENT, '' ];
  }
  const chunkList = <[string, string][]>_.chunk(pathSplits, 2);
  return chunkList[0];
}

function decryptComponent(short: string): string {
  return COMPONENT_LIST[short] || short;
}
