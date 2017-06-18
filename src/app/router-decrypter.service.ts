import { Injectable } from '@angular/core';

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

@Injectable()
export class RouterDecrypterService {
  cryptComponent(long: string): string {
    return COMPONENT_LIST_REVERSE[long] || long;
  }

  decryptComponent(short: string): string {
    return COMPONENT_LIST[short] || short;
  }
}
