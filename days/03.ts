import { Solution } from '@types';
import { match, matchMap, sum } from '@operators';
import { map, mergeAll, reduce } from 'rxjs';

export const p1: Solution = (source) =>
	source.pipe(
		matchMap(/mul\((\d+),(\d+)\)/g, ([, a, b]) => +a * +b),
		mergeAll(),
		sum(),
	);

export const p2: Solution = (source) =>
	source.pipe(
		match(/mul\((\d+),(\d+)\)|(do(n't)?)\(\)/g),
		mergeAll(),
		reduce(([sum, enabled], [, a, b, y, x]) => y ? [sum, !x] : [+sum + (enabled ? +a * +b : 0), enabled], [0, true]),
		map(([sum]) => sum as number),
	);
