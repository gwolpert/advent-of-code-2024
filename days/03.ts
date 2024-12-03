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
		reduce(([sum, x], [, a, b, doo, dont]) => (doo ? [sum, !dont] : [+sum + (x ? +a * +b : 0), x]), [0, true]),
		map(([sum]) => +sum),
	);
