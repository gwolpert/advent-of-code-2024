import { Solution } from '@types';
import { splitRows, sum } from '@operators';
import { filter, map, mergeAll, Observable as $, toArray, withLatestFrom } from 'rxjs';

const processInput = (source: $<string>) => {
  const input = source.pipe(
    splitRows(2),
  );
  const rules = input.pipe(
    map(([rulesInput]) => rulesInput),
    splitRows(),
    mergeAll(),
    map((ruleInput) => ruleInput.split('|').map(Number)),
    toArray(),
  );
  const manuals = input.pipe(
    map(([, manualsInput]) => manualsInput),
    splitRows(),
    mergeAll(),
    map((manualInput) => manualInput.split(',').map(Number)),
  );
  return { manuals, rules };
};

const sumMiddlePages = () => (source: $<number[]>) =>
  source.pipe(
    map((pages) => pages[(pages.length - 1) / 2]),
    sum(),
  );

export const p1: Solution = (source) => {
  const { manuals, rules } = processInput(source);

  return manuals.pipe(
    withLatestFrom(rules),
    filter(([pages, rules]) =>
      rules
        .map(([left, right]) => [pages.indexOf(left), pages.indexOf(right)])
        .every(([left, right]) => right === -1 || left < right)
    ),
    map(([pages]) => pages),
    sumMiddlePages(),
  );
};

export const p2: Solution = (source) => {
  const { manuals, rules } = processInput(source);

  return manuals.pipe(
    withLatestFrom(rules),
    filter(([pages, rules]) =>
      rules
        .map(([left, right]) => [pages.indexOf(left), pages.indexOf(right)])
        .some(([left, right]) => right !== -1 && left > right)
    ),
    map(([pages, rules]) => {
      const ruleSet = new Map(
        rules.flatMap<[string, number]>(([left, right]) => [[`${left},${right}`, -1], [`${right},${left}`, 1]]),
      );
      return pages.toSorted((a, b) => ruleSet.get(`${a},${b}`) ?? 0);
    }),
    sumMiddlePages(),
  );
};
