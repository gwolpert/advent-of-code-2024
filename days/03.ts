import { Solution } from '@types';
import { match, sum } from '@operators';
import { map, Observable as $ } from 'rxjs';

const findInstructions = () => (source: $<string>) =>
	source.pipe(
		match(/mul\((\d+),(\d+)\)/g),
		map(([, a, b]) => +a * +b),
		sum(),
	);

export const p1: Solution = (source) => source.pipe(findInstructions());

export const p2: Solution = (source) =>
	source.pipe(
		map((input) => input.replaceAll(/don't\(\).*?(do\(\)|$)/gs, '')),
		findInstructions(),
	);
