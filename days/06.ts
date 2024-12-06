import { Direction, Matrix, MatrixCell, MatrixCoordinates, Solution } from '@types';
import { extractVectorNodes, findVectorNode, getVectorNode, matrix, nodesInDirection } from '@operators';
import { count, EMPTY, expand, filter, last, map, mergeMap, Observable as $, of, tap, queueScheduler } from 'rxjs';

interface State {
  currentNode: MatrixCell<string>;
  direction: Direction;
  infiniteLoop: boolean;
  visited: Set<string>;
  visitedInDirection: Set<string>;
  start: MatrixCoordinates;
}

const createLab = () => (source: $<string>) => source.pipe(matrix());

const createLabGuard = () => (source: $<Matrix<string>>) => {
  return source.pipe(
    findVectorNode((cell) => cell.value === '^'),
    filter(Boolean),
    map((currentNode): State => ({
      currentNode,
      direction: '↑',
      infiniteLoop: false,
      visited: new Set<string>([currentNode.coord.toString()]),
      visitedInDirection: new Set<string>([currentNode.coord.toString() + '↑']),
      start: currentNode.coord,
    })),
    expand((state) => {
      if (!state || state.infiniteLoop) return EMPTY;
      return of(state).pipe(
        map(({ currentNode }) => currentNode),
        nodesInDirection(1, state.direction),
        map(([nextNodesInDirection]) => nextNodesInDirection.vector),
        extractVectorNodes(),
        determineNextState(state),
      );
    }, 1, queueScheduler),
    last(),
  );
};

const turnRight = (direction: Direction) => {
  const map: Record<string, Direction> = { '↑': '→', '→': '↓', '↓': '←', '←': '↑' };
  return map[direction];
};

const determineNextState = (state: State) => (source: $<MatrixCell<string>[]>) =>
  source.pipe(
    filter((array) => array.length >= 1),
    map(([nextNode]): State => {
      const nextCoord = nextNode.coord.toString();
      return nextNode.value === '#'
        ? {
          ...state,
          direction: turnRight(state.direction),
        }
        : {
          ...state,
          currentNode: nextNode,
          infiniteLoop: state.visitedInDirection.has(nextCoord + state.direction),
          visited: state.visited.add(nextCoord),
          visitedInDirection: state.visitedInDirection.add(nextCoord + state.direction),
        };
    }),
  );

export const p1: Solution = (source) =>
  source.pipe(
    createLab(),
    createLabGuard(),
    map((guard) => guard.visited.size),
  );

export const p2: Solution = (source) =>
  source.pipe(
    createLab(),
    createLabGuard(),
    tap(({ visited, start }) => visited.delete(start.toString())),
    mergeMap(({ visited }) => visited.values().toArray()),
    mergeMap((coord) =>
      source.pipe(
        createLab(),
        getVectorNode(MatrixCoordinates.fromString(coord)),
        filter(Boolean),
        tap((node) => node.value = '#'),
        map(({ matrix }) => matrix),
        createLabGuard(),
        filter(({ infiniteLoop }) => infiniteLoop),
      )
    ),
    count(),
  );
