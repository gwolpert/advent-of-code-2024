import { Solution } from '@types';
import { enumerate, split, splitRows, sum } from '@operators';
import { filter, map, Observable as $, toArray, withLatestFrom } from 'rxjs';

const processInput = () => (source: $<string>) => {
  const input = source.pipe(splitRows(2));
  return input.pipe(
    map(([, manuals]) => manuals),
    splitRows(),
    enumerate((manual) =>
      manual.pipe(
        split(/,/),
        map((x) => x.map(Number)),
      )
    ),
    withLatestFrom(input.pipe(
      map(([rules]) => rules),
      splitRows(),
      enumerate((rule) =>
        rule.pipe(
          split(/\|/),
          map((x) => x.map(Number)),
        )
      ),
      toArray(),
    )),
  );
};

const sumMiddlePages = () => (source: $<number[]>) =>
  source.pipe(
    map((pages) => pages[(pages.length - 1) / 2]),
    sum(),
  );

export const p1: Solution = (source) =>
  source.pipe(
    processInput(),
    filter(([pages, rules]) =>
      rules.every(([left, right]) => !~pages.indexOf(right) || pages.indexOf(left) < pages.indexOf(right))
    ),
    map(([pages]) => pages),
    sumMiddlePages(),
  );

export const p2: Solution = (source) =>
  source.pipe(
    processInput(),
    filter(([pages, rules]) =>
      rules.some(([left, right]) => ~pages.indexOf(right) && pages.indexOf(left) > pages.indexOf(right))
    ),
    map(([pages, rules]) => {
      const flatRules = rules.flatMap<[string, number]>(([l, r]) => [[`${l},${r}`, -1], [`${r},${l}`, 1]]);
      const ruleMap = new Map(flatRules);
      return pages.toSorted((a, b) => ruleMap.get(`${a},${b}`) ?? 0);
    }),
    sumMiddlePages(),
  );
