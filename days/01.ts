import { Solution } from '@types';
import {matchReduce, sum} from '@operators';
import {map, mergeMap} from 'npm:rxjs@7.8.1';

export const p1: Solution = (source) =>
	source.pipe(
		matchReduce(/^(\d+)\s+(\d+)$/gm, ([r, l], [, x, y]) => [[...r, +x], [...l, +y]], [[], []] as number[][]),
		map(([r, l]) => [r.sort((a, b) => a - b), l.sort((a, b) => a - b)]),
		mergeMap(([r, l]) => r.map((x, i) => Math.abs(x - l[i]))),
		sum()
	);

export const p2: Solution = (source) =>
	source.pipe(
		matchReduce(/^(\d+)\s+(\d+)$/gm, ([r, l], [, x, y]) => [[...r, +x], [...l, +y]], [[], []] as number[][]),
		mergeMap(([r, l]) => r.map((x) => x * l.filter(y => y === x).length)),
		sum()
	);
