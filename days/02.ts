import { Solution } from '@types';
import { count, enumerate, some, splitRows } from '@operators';
import { every, filter, map, Observable as $, pairwise } from 'rxjs';
import { mergeAll } from 'rxjs';

const processInput = () => (source: $<string>) =>
  source.pipe(
    splitRows(),
    mergeAll(),
    map((row) => row.split(/\s+/).map(Number)),
  );

const validateReport = () => (source: $<number[]>) =>
  source.pipe(
    filter((numbers) =>
      numbers.every((n, i) => i === 0 || n >= numbers[i - 1]) ||
      numbers.every((n, i) => i === 0 || n <= numbers[i - 1])
    ),
    enumerate((number) =>
      number.pipe(
        pairwise(),
        map(([prev, curr]) => Math.abs(curr - prev)),
        every((diff) => diff <= 3 && diff > 0),
      )
    ),
  );

export const p1: Solution = (source) =>
  source.pipe(
    processInput(),
    validateReport(),
    count(Boolean),
  );

export const p2: Solution = (source) =>
  source.pipe(
    processInput(),
    map((numbers) => [numbers, ...numbers.map((_, i) => numbers.filter((_, j) => i !== j))]),
    some((report) => report.pipe(validateReport())),
    count(),
  );
