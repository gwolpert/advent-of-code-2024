import { from, map, Observable as $, reduce } from 'rxjs';
import { splitRows } from './string-operators.ts';
import { Direction, Matrix, MatrixCell, MatrixCoordinates, MatrixDirection, MatrixOrCell } from '@types';
import { mergeMap } from 'rxjs';

/**
 * Converts a string into a matrix
 * A matrix is a map of cells, where each cell is a tuple of the value, coordinates, and the matrix itself
 * the coordinates are [x, y] where x is the column and y is the row
 * The map can be indexed by the coordinates in the format `{x},{y}`
 * @param map The mappping function to convert the cell value, by default it returns the cell as is (string)
 * @returns A function that takes an observable of strings and returns an observable of the matrix
 */
export const matrix = <T = string>(map: (x: string) => T = (x) => x as T) => (source: $<string>) =>
	source.pipe(
		splitRows(),
		reduce((acc, row, y) => {
			[...row].forEach((curr, x) => {
				const mapFn = (cell: string): MatrixCell<T> => ({ value: map(cell), coord: [x, y], matrix: acc });
				return acc.set(`${x},${y}`, mapFn(curr));
			});
			return acc;
		}, new Map() as Matrix<T>),
	);

export const cellsFromMatrix = () => <T>(source: $<Matrix<T>>) =>
	source.pipe(
		mergeMap((matrix) => from(matrix.values().toArray())),
	);

export const cellFromMatrix = <T>(coord: MatrixCoordinates) => (source: $<MatrixOrCell<T>>) =>
	source.pipe(
		map((matrixOrCell) => MatrixOrCell.extractMatrix(matrixOrCell)?.get(coord.toString())),
	);

export const neighborsFromCell =
	<T>(distance = 1, ...directions: Direction[]) => (source: $<MatrixCell<T> | undefined>) =>
		source.pipe(
			map((matrixCell) => {
				if (!matrixCell) return [];
				return directions.map((direction) => {
					let { coord, matrix } = matrixCell;
					const neighbors: Matrix<T> = new Map();
					const setNeighbor = (direction: Direction, distance: number) => {
						const newCoord = MatrixCell.move(coord, direction, distance);
						const neighbor = matrix.get(newCoord.toString());
						if (neighbor) neighbors.set(newCoord.toString(), neighbor);
					};

					for (let i = 1; i <= distance; i++) {
						if ('*+↕↑'.includes(direction)) setNeighbor('↑', i);
						if ('*+↕↓'.includes(direction)) setNeighbor('↓', i);
						if ('*+↔←'.includes(direction)) setNeighbor('←', i);
						if ('*+↔→'.includes(direction)) setNeighbor('→', i);
						if ('*x⤡↖'.includes(direction)) setNeighbor('↖', i);
						if ('*x⤢↗'.includes(direction)) setNeighbor('↗', i);
						if ('*x⤡↘'.includes(direction)) setNeighbor('↘', i);
						if ('*x⤢↙'.includes(direction)) setNeighbor('↙', i);
					}

					return { direction, matrix: neighbors } as MatrixDirection<T>;
				});
			}),
		);
