import { Solution } from '@types';
import { matchAll, sum } from '@operators';
import { map, Observable as $ } from 'rxjs';

const findInstructions = () => (source: $<string>) =>
  source.pipe(
    matchAll(/mul\((\d+),(\d+)\)/g),
    sum(([, a, b]) => +a * +b),
  );

export const p1: Solution = (source) => source.pipe(findInstructions());

export const p2: Solution = (source) =>
  source.pipe(
    map((input) => input.replaceAll(/don't\(\).*?(do\(\)|$)/gs, '')),
    findInstructions(),
  );
