import { Solution } from '@types';
import { count, matrix, matrixCells, matrixNeighbors } from '@operators';
import { filter } from 'rxjs';
import { reduce } from 'rxjs';

export const p1: Solution = (source) =>
	source.pipe(
		matrix(),
        matrixCells(),
        filter((cell) => cell.value === 'X'),
        matrixNeighbors(3, '↑', '←', '→', '↓', '↖', '↗', '↘', '↙'),
        reduce((acc, neighbors) => acc + neighbors.filter(({matrix}) => {
            if (matrix.size !== 3) return false;
            const values = matrix.values().map((x) => x.value).toArray().join('');
            return values === 'MAS';
        }).length, 0),
	);


export const p2: Solution = (source) =>
	source.pipe(
		matrix(),
		matrixCells(),
		filter((cell) => cell.value === 'A'),
		matrixNeighbors(1, '⤡', '⤢'),
		count((neighbors) => 
			neighbors.every(({matrix}) => !!matrix.values().map((x) => x.value).toArray().join('').match(/MS|SM/g))),
	);
