import { map, Observable as $, reduce } from 'rxjs';
import { splitRows } from './string-operators.ts';
import { Direction, Matrix, MatrixCell, MatrixCoordinates, MatrixDirection, MatrixOrCell } from '@types';
import { mergeAll } from 'rxjs';

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
    mergeAll(),
    reduce((acc, row, y) => {
      [...row].forEach((curr, x) => {
        const mapFn = (cell: string): MatrixCell<T> => ({ value: map(cell), coord: [x, y], matrix: acc });
        return acc.set(`${x},${y}`, mapFn(curr));
      });
      return acc;
    }, new Map() as Matrix<T>),
  );

/**
 * Gets all the cells from a vector and emits them as a stream
 * @returns A stream of the cells
 */
export const extractVectorNodes = () => <T>(source: $<Matrix<T>>) =>
  source.pipe(
    map((matrix) => matrix.values().toArray()),
  );

/**
 * Gets a cell from a vector by its coordinates
 * @param coord The coordinates of the cell to get
 * @returns A stream of the cell
 */
export const getVectorNode = <T>(coord: MatrixCoordinates) => (source: $<MatrixOrCell<T>>) =>
  source.pipe(
    map((matrixOrCell) => MatrixOrCell.extractMatrix(matrixOrCell)?.get(coord.toString())),
  );

/**
 * Find the first node that satisfies a predicate
 * @param predicate The predicate to satisfy
 * @returns The first node that satisfies the predicate
 */
export const findVectorNode = <T>(predicate: (cell: MatrixCell<T>) => boolean) => (source: $<Matrix<T>>) =>
  source.pipe(
    extractVectorNodes(),
    map((nodes) => nodes.find(predicate)),
  );

/**
 * Finds the nodes of another node in a matrix in the specified directions
 * @param distance The distance to find the neighbors from the original cell
 * @param directions The directions to find the neighbors from the original cell
 * @returns The nodes of the cell grouped by direction.
 */
export const nodesInDirection =
  <T>(distance = 1, ...directions: Direction[]) => (source: $<MatrixCell<T> | undefined>) =>
    source.pipe(
      map((matrixCell) => {
        if (!matrixCell) return [];
        return directions.map((direction) => {
          let { coord, matrix } = matrixCell;
          const vector: Matrix<T> = new Map();
          const setNode = (direction: Direction, distance: number) => {
            const newCoord = MatrixCell.move(coord, direction, distance);
            const neighbor = matrix.get(newCoord.toString());
            if (neighbor) vector.set(newCoord.toString(), neighbor);
          };

          for (let i = 1; i <= distance; i++) {
            if ('*+↕↑'.includes(direction)) setNode('↑', i);
            if ('*+↕↓'.includes(direction)) setNode('↓', i);
            if ('*+↔←'.includes(direction)) setNode('←', i);
            if ('*+↔→'.includes(direction)) setNode('→', i);
            if ('*x⤡↖'.includes(direction)) setNode('↖', i);
            if ('*x⤢↗'.includes(direction)) setNode('↗', i);
            if ('*x⤡↘'.includes(direction)) setNode('↘', i);
            if ('*x⤢↙'.includes(direction)) setNode('↙', i);
          }

          return { direction, vector } as MatrixDirection<T>;
        });
      }),
    );
