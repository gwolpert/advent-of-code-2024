import {Solution} from '@types';
import {count, each, some, splitRows} from "@operators";
import {every, filter, map, pairwise, Observable as $} from 'npm:rxjs';

const filterMonotonic = () => (source: $<number[]>) =>
	source.pipe(
		filter((numbers) =>
			numbers.every((n, i) => i === 0 || n >= numbers[i - 1]) ||
			numbers.every((n, i) => i === 0 || n <= numbers[i - 1])
		),
	);

const verifyDifferences = () => (source: $<number[]>) =>
	source.pipe(
		each((number) => number.pipe(
			pairwise(),
			map(([prev, curr]) => Math.abs(curr - prev)),
			every((diff) => diff <= 3 && diff > 0)
		)),
	);

export const p1: Solution = (source) => source.pipe(
    splitRows(),
		map((row) => row.split(/\s+/).map(Number)),
		filterMonotonic(),
		verifyDifferences(),
		filter(Boolean),
    count()
);

export const p2: Solution = (source) => source.pipe(
	splitRows(),
	map((row) => row.split(/\s+/).map(Number)),
	map((numbers) => [numbers, ...numbers.map((_, i) => numbers.filter((_, j) => j !== i))]),
	each((report) => report.pipe(
		filterMonotonic(),
		verifyDifferences(),
		some(Boolean),
	)),
	count()
);
