import { Solution } from '@types';
import { cellsFromMatrix, count, enumerate, matrix, neighborsFromCell } from '@operators';
import { every, filter, map } from 'rxjs';

export const p1: Solution = (source) =>
	source.pipe(
		matrix(),
		cellsFromMatrix(),
		filter((cell) => cell.value === 'X'),
		neighborsFromCell(3, '↑', '←', '→', '↓', '↖', '↗', '↘', '↙'),
		enumerate((neighbor) =>
			neighbor.pipe(
				filter(({ matrix }) => matrix.size === 3),
				map(({ matrix }) => matrix.values().map(({ value }) => value).toArray().join('')),
				filter((values) => values === 'MAS'),
			)
		),
		count(),
	);

export const p2: Solution = (source) =>
	source.pipe(
		matrix(),
		cellsFromMatrix(),
		filter((cell) => cell.value === 'A'),
		neighborsFromCell(1, '⤡', '⤢'),
		enumerate((neighbor) =>
			neighbor.pipe(
				every(({ matrix }) => !!matrix.values().map((x) => x.value).toArray().join('').match(/MS|SM/g)),
			)
		),
		count(Boolean),
	);
