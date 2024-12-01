import { Solution } from '@types';
import { matchReduce, sum } from '@operators';
import { map, mergeMap, Observable as $ } from 'npm:rxjs@7.8.1';

const processInput = () => (source: $<string>) =>
	source.pipe(
		matchReduce(/^(\d+)\s+(\d+)$/gm, ([r, l], [, x, y]) => [[...r, +x], [...l, +y]], [[], []] as number[][]),
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
