import { Solution } from '@types';
import { cellsFromMatrix, count, enumerate, join, matrix, neighborsFromCell } from '@operators';
import { every, filter, map, mergeAll } from 'rxjs';

export const p1: Solution = (source) =>
  source.pipe(
    matrix(),
    cellsFromMatrix(),
    mergeAll(),
    filter((cell) => cell.value === 'X'),
    neighborsFromCell(3, '↑', '←', '→', '↓', '↖', '↗', '↘', '↙'),
    enumerate((neighbor) =>
      neighbor.pipe(
        filter(({ matrix }) => matrix.size === 3),
        map(({ matrix }) => matrix),
        cellsFromMatrix(),
        enumerate((cell) =>
          cell.pipe(
            map(({ value }) => value),
            join(),
          )
        ),
        filter((values) => values === 'MAS'),
      )
    ),
    count(),
  );

export const p2: Solution = (source) =>
  source.pipe(
    matrix(),
    cellsFromMatrix(),
    mergeAll(),
    filter((cell) => cell.value === 'A'),
    neighborsFromCell(1, '⤡', '⤢'),
    enumerate((neighbor) =>
      neighbor.pipe(
        map(({ matrix }) => matrix),
        cellsFromMatrix(),
        enumerate((cell) =>
          cell.pipe(
            map(({ value }) => value),
            join(),
          )
        ),
        every((values) => !!values.match(/MS|SM/)),
      )
    ),
    count(Boolean),
  );
