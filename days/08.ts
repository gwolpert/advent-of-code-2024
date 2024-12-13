import { Matrix, MatrixCoordinates, Solution } from '@types';
import { filterVectorNodes, matrix, matrixSize } from '@operators';
import {
  count,
  filter,
  groupBy,
  map,
  mergeAll,
  mergeMap,
  Observable as $,
  reduce,
  shareReplay,
  toArray,
  withLatestFrom,
} from 'rxjs';

const createMatrix = () => (source: $<string>) =>
  source.pipe(
    matrix(),
    shareReplay(1),
  );

const antennasByFrequency = () => (source: $<string>) =>
  source.pipe(
    createMatrix(),
    filterVectorNodes(({ value }) => value !== '.'),
    mergeAll(),
    groupBy(({ value }) => value),
  );

const countUniqueAntennas = () => (source: $<MatrixCoordinates>) =>
  source.pipe(
    reduce((acc, curr) => acc.concat(curr.toString()), new Array<string>()),
    mergeMap((antennas) => new Set(antennas).values().toArray()),
    count(),
  );

export const p1: Solution = (source) =>
  source.pipe(
    antennasByFrequency(),
    mergeMap((group) =>
      group.pipe(
        toArray(),
        map((antennas) =>
          antennas.map(({ coord: a }, index) =>
            antennas.slice(index + 1).flatMap(({ coord: b }) => {
              const [x1, y1] = a;
              const [x2, y2] = b;
              const [dx, dy] = [x1 - x2, y1 - y2];
              return [
                [x1 + dx, y1 + dy],
                [x2 - dx, y2 - dy],
              ];
            })
          )
        ),
        mergeMap((antennas) => antennas.flat()),
        withLatestFrom(source.pipe(createMatrix(), matrixSize())),
        filter(([[x, y], [xMax, yMax]]) => x >= 0 && x <= xMax && y >= 0 && y <= yMax),
        map(([coord]) => coord),
      )
    ),
    countUniqueAntennas(),
  );

export const p2: Solution = (source) =>
  source.pipe(
    antennasByFrequency(),
    mergeMap((group) =>
      group.pipe(
        toArray(),
        withLatestFrom(source.pipe(createMatrix(), matrixSize())),
        map(([antennas, [xMax, yMax]]) =>
          antennas.map(({ coord: a }, index) =>
            antennas.slice(index + 1).flatMap(({ coord: b }) => {
              const [x1, y1] = a;
              const [x2, y2] = b;
              const [dx, dy] = [x1 - x2, y1 - y2];
              const antennas = new Array<MatrixCoordinates>();
              for (let [x, y] = a; x >= 0 && x <= xMax && y >= 0 && y <= yMax; x += dx, y += dy) antennas.push([x, y]);
              for (let [x, y] = b; x >= 0 && x <= xMax && y >= 0 && y <= yMax; x -= dx, y -= dy) antennas.push([x, y]);
              return antennas;
            })
          )
        ),
        mergeMap((antennas) => antennas.flat()),
      )
    ),
    countUniqueAntennas(),
  );
