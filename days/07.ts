import { Solution } from '@types';
import { enumerate, match, splitRows, sum } from '@operators';
import { filter, map, Observable as $ } from 'rxjs';

type Equation = (a: number, b: number) => number;
type EquationFinder = (equations: number[]) => boolean;

export const totalCalibrationResult = (...equations: Equation[]) => (source: $<string>) => {
  const findValidEquations: EquationFinder = ([result, a, b, ...remainder]) =>
    equations.some((operation) => {
      const next = operation(a, b);
      return remainder.length ? findValidEquations([result, next, ...remainder]) : next === result;
    });

  return source.pipe(
    splitRows(),
    enumerate((row) =>
      row.pipe(
        match(/(\d+)/g),
        map((match) => match.map(Number)),
        filter(findValidEquations),
      )
    ),
    sum(([result]) => result),
  );
};

export const p1: Solution = (source) =>
  source.pipe(
    totalCalibrationResult(
      (a, b) => a + b,
      (a, b) => a * b,
    ),
  );

export const p2: Solution = (source) =>
  source.pipe(
    totalCalibrationResult(
      (a, b) => a + b,
      (a, b) => a * b,
      (a, b) => +`${a}${b}`,
    ),
  );
