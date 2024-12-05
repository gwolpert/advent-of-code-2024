import { MatrixCell, Solution } from '@types';
import { cellsFromMatrix, count, enumerate, join, matrix, neighborsFromCell } from '@operators';
import { every, filter, map, mergeAll, Observable as $ } from 'rxjs';

export const readMatrixCells = () => (source: $<string>) =>
  source.pipe(
    matrix(),
    cellsFromMatrix(),
    mergeAll(),
  );

export const joinCellValues = () => (source: $<MatrixCell<string>[]>) =>
  source.pipe(
    enumerate((cell) =>
      cell.pipe(
        map(({ value }) => value),
        join(),
      )
    ),
  );

export const p1: Solution = (source) =>
  source.pipe(
    readMatrixCells(),
    filter((cell) => cell.value === 'X'),
    neighborsFromCell(3, '↑', '←', '→', '↓', '↖', '↗', '↘', '↙'),
    enumerate((neighbor) =>
      neighbor.pipe(
        map(({ matrix }) => matrix),
        filter((matrix) => matrix.size === 3),
        cellsFromMatrix(),
        joinCellValues(),
        filter((values) => values === 'MAS'),
      )
    ),
    count(),
  );

export const p2: Solution = (source) =>
  source.pipe(
    readMatrixCells(),
    filter((cell) => cell.value === 'A'),
    neighborsFromCell(1, '⤡', '⤢'),
    enumerate((neighbor) =>
      neighbor.pipe(
        map(({ matrix }) => matrix),
        cellsFromMatrix(),
        joinCellValues(),
        every((values) => !!values.match(/MS|SM/)),
      )
    ),
    count(Boolean),
  );
