import { MatrixCell, Solution } from '@types';
import { extractVectorNodes, count, enumerate, join, matrix, nodesInDirection } from '@operators';
import { every, filter, map, mergeAll, Observable as $ } from 'rxjs';

export const extractMatrixNodes = () => (source: $<string>) =>
  source.pipe(
    matrix(),
    extractVectorNodes(),
    mergeAll(),
  );

export const joinNodeValues = () => (source: $<MatrixCell<string>[]>) =>
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
    extractMatrixNodes(),
    filter((node) => node.value === 'X'),
    nodesInDirection(3, '↑', '←', '→', '↓', '↖', '↗', '↘', '↙'),
    enumerate((nodesInDirection) =>
      nodesInDirection.pipe(
        map(({ vector }) => vector),
        filter((vector) => vector.size === 3),
        extractVectorNodes(),
        joinNodeValues(),
        filter((wordInDirection) => wordInDirection === 'MAS'),
      )
    ),
    count(),
  );

export const p2: Solution = (source) =>
  source.pipe(
    extractMatrixNodes(),
    filter((node) => node.value === 'A'),
    nodesInDirection(1, '⤡', '⤢'),
    enumerate((nodesInDirection) =>
      nodesInDirection.pipe(
        map(({ vector }) => vector),
        extractVectorNodes(),
        joinNodeValues(),
        every((wordInDirection) => !!wordInDirection.match(/MS|SM/)),
      )
    ),
    count(Boolean),
  );
