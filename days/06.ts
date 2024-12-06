import { Direction, Matrix, MatrixCoordinates, Solution } from '@types';
import { extractVectorNodes, findVectorNode, getVectorNode, matrix, nodesInDirection } from '@operators';
import { count, EMPTY, expand, filter, last, map, mergeMap, Observable as $, of, tap } from 'rxjs';

const turnRight = (direction: Direction) => {
  const map: Record<string, Direction> = {
    '↑': '→',
    '→': '↓',
    '↓': '←',
    '←': '↑',
  };
  return map[direction];
};

const createLab = () => (source: $<string>) => source.pipe(matrix());

const createLabGuard = () => (source: $<Matrix<string>>) => {
  return source.pipe(
    findVectorNode((cell) => cell.value === '^'),
    map((currentNode) => {
      if (!currentNode) throw new Error('No start position found');
      return {
        currentNode,
        direction: '↑' as Direction,
        infiniteLoop: false,
        visited: new Set<string>([currentNode.coord.toString()]),
        visitedInDirection: new Set<string>([currentNode.coord.toString() + '↑']),
        start: currentNode.coord,
      };
    }),
    expand((state) => {
      if (!state || state.infiniteLoop) return EMPTY;
      return of(state).pipe(
        map(({ currentNode }) => currentNode),
        nodesInDirection(1, state.direction),
        map(([nextNodesInDirection]) => nextNodesInDirection.vector),
        extractVectorNodes(),
        map(([nextNode]) => {
          if (!nextNode) return null;
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
    }),
    filter(Boolean),
    last(),
  );
};

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
    map((coord) => MatrixCoordinates.fromString(coord)),
    mergeMap((coord) =>
      source.pipe(
        createLab(),
        getVectorNode(coord),
        filter(Boolean),
        tap((node) => node.value = '#'),
        map(({ matrix }) => matrix),
        createLabGuard(),
        filter(({ infiniteLoop }) => infiniteLoop),
      )
    ),
    count(),
  );
