import { Solution } from '@types';
import { splitRows, sum } from '@operators';
import { filter, map, mergeAll, Observable as $, toArray, withLatestFrom } from 'rxjs';

const processInput = () => (source: $<string>) => {
  const input = source.pipe(splitRows(2));
  return input.pipe(
    map(([, manualsInput]) => manualsInput),
    splitRows(),
    mergeAll(),
    map((manualInput) => manualInput.split(',').map(Number)),
    withLatestFrom(input.pipe(
      map(([rulesInput]) => rulesInput),
      splitRows(),
      mergeAll(),
      map((ruleInput) => ruleInput.split('|').map(Number)),
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
      rules
        .map(([left, right]) => [pages.indexOf(left), pages.indexOf(right)])
        .every(([left, right]) => !~right || left < right)
    ),
    map(([pages]) => pages),
    sumMiddlePages(),
  );

export const p2: Solution = (source) =>
  source.pipe(
    processInput(),
    filter(([pages, rules]) =>
      rules
        .map(([left, right]) => [pages.indexOf(left), pages.indexOf(right)])
        .some(([left, right]) => ~right && left > right)
    ),
    map(([pages, rules]) => {
      const flatRules = rules.flatMap<[string, number]>(([l, r]) => [[`${l},${r}`, -1], [`${r},${l}`, 1]]);
      const ruleMap = new Map(flatRules);
      return pages.toSorted((a, b) => ruleMap.get(`${a},${b}`) ?? 0);
    }),
    sumMiddlePages(),
  );
