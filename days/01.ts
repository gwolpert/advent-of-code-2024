import { Solution } from '@types';
import { match, sum } from '@operators';
import { map, mergeMap, Observable as $ } from 'rxjs';
import { mergeAll, reduce } from 'npm:rxjs';

const processInput = () => (source: $<string>) =>
	source.pipe(
		match(/^(\d+)\s+(\d+)$/gm),
		mergeAll(),
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
