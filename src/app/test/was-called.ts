import {
  Description,
  Matcher,
  Promise,
  TypeSafeMatcher,
  asMatcher,
  assertThat,
  contains,
  is,
} from 'hamjest';
import * as _ from 'lodash';

export function isSpy(): TypeSafeMatcher {
  return _.create(new TypeSafeMatcher(), {
    isExpectedType: function (actual: any): boolean {
      return !_.isUndefined(actual.callCount);
    },
    describeTo: function (description: Description): void {
      description.append('a spy');
    }
  });
}

export interface WasCalledMatcher extends TypeSafeMatcher {
  withArgs(...args: Array<any>): WasCalledMatcher;
  withoutArgs(...args: Array<any>): WasCalledMatcher;
}

export function wasCalled(count?: number): WasCalledMatcher {
  const countMatcher: Matcher = asMatcher(_.isUndefined(count) ? 1 : count);
  let argsMatcher: Matcher;

  function getCallCount(actual: any): number {
    if (argsMatcher) {
      return _.reduce(actual.args, function (matches: number, args: Array<any>): number {
        if (argsMatcher.matches(args)) {
          return matches + 1;
        } else {
          return matches;
        }
      }, 0);
    } else {
      return actual.callCount;
    }
  }

  function appendArgs(description: Description, args: Array<any>): void {
    description.appendList('(', ', ', ')', _.toArray(args));
  }

  return _.create(isSpy(), {
    matchesSafely: function (actual: any): boolean | Promise {
      return countMatcher.matches(getCallCount(actual));
    },
    describeTo: function (description: Description): void {
      description.append('spy to be called ');
      countMatcher.describeTo(description);
      description.append(' times');
      if (argsMatcher) {
        description.append(' with args ');
        argsMatcher.describeTo(description);
      }
    },
    describeMismatchSafely: function (actual: any, description: Description): void {
      const callCount: number = getCallCount(actual);
      description.appendValue(actual)
                 .append(' was called ')
                 .appendValue(callCount)
                 .append(' times');
      if (argsMatcher) {
        description.append(' with args ');
        argsMatcher.describeTo(description);
      }

      if (actual.args.length) {
        description.append('\nAll invocations: ');
        _.forEach(actual.args, function (args: any, index: number): void {
            description.append('\n')
                       .append(String(index + 1))
                       .append(': ');
            appendArgs(description, args);
        });
        description.append('\n');
      }
    },
    withArgs: function (...args: Array<any>): WasCalledMatcher {
      assertThat(argsMatcher, is(undefined));
      argsMatcher = contains(...args);
      return this;
    },
    withoutArgs: function (...args: Array<any>): WasCalledMatcher {
      assertThat(argsMatcher, is(undefined));
      argsMatcher = contains();
      return this;
    }
  });
}
