import { Solution } from '@types';
import { matchAll, sum } from '@operators';
import { map, mergeMap, Observable as $, reduce } from 'rxjs';

const processInput = () => (source: $<string>) =>
  source.pipe(
    matchAll(/^(\d+)\s+(\d+)$/gm),
    reduce(([r, l], [, x, y]) => [[...r, +x], [...l, +y]], [[], []] as number[][]),
  );

export const p1: Solution = (source) =>
  source.pipe(
    processInput(),
    map(([r, l]) => [r.sort((a, b) => a - b), l.sort((a, b) => a - b)]),
    mergeMap(([r, l]) => r.map((x, i) => Math.abs(x - l[i]))),
    sum(),
  );

export const p2: Solution = (source) =>
  source.pipe(
    processInput(),
    mergeMap(([r, l]) => r.map((x) => x * l.filter((y) => y === x).length)),
    sum(),
  );
