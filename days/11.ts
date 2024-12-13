import { Solution } from '@types';
import { split, sum } from '@operators';
import { EMPTY, expand, last, map, mergeAll, mergeMap, Observable as $, of, toArray } from 'rxjs';

const stones = (blinks: number, currentBlink = 0) => (source: $<string>) =>
  source.pipe(
    split(/\s/),
    mergeAll(),
    map((x) => [+x, 1] as [number, number]),
    toArray(),
    map((stones) => new Map(stones)),
    expand((state) => {
      if (currentBlink++ >= blinks) return EMPTY;
      const next = new Map<number, number>();
      const add = (stone: number, count: number) => next.set(stone, (next.get(stone) ?? 0) + count);
      for (const [stone, count] of state) {
        const digits = Math.floor(Math.log10(stone) + 1);
        if (stone === 0) add(1, count);
        else if (digits % 2 === 0) {
          const devisor = 10 ** (digits / 2);
          add(Math.floor(stone / devisor), count);
          add(stone % devisor, count);
        } else add(stone * 2024, count);
      }
      return of(next);
    }),
    last(),
    mergeMap((state) => [...state.values()]),
    sum(),
  );

export const p1: Solution = (source) => source.pipe(stones(25));

export const p2: Solution = (source) => source.pipe(stones(75));
