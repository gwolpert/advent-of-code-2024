import { Solution } from '@types';
import { match, sum } from '@operators';
import { map, reduce } from 'rxjs';

export const p1: Solution = (source) =>
	source.pipe(
		match(/mul\((\d+),(\d+)\)/g),
		map(([, a, b]) => +a * +b),
		sum(),
	);

export const p2: Solution = (source) =>
	source.pipe(
		match(/mul\((\d+),(\d+)\)|(do(n't)?)\(\)/g),
		reduce(([sum, enabled], [, a, b, y, x]) => y ? [sum, !x] : [+sum + (enabled ? +a * +b : 0), enabled], [0, true]),
		map(([sum]) => sum as number),
	);
