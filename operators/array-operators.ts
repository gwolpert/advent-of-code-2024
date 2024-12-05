import { defaultIfEmpty, filter, from, map, mergeAll, type Observable as $, reduce, take } from 'npm:rxjs';

/**
 * Sums all the numbers in the array
 */
export const sum = () => (source: $<number>) =>
  source.pipe(
    reduce((acc, curr) => acc + +curr, 0),
  );

/**
 * Multiplies all the numbers in the array
 */
export const product = () => (source: $<number>) =>
  source.pipe(
    reduce((acc, curr) => acc * curr, 1),
  );

/**
 * Returns the highest number in the array
 */
export const max = () => (source: $<number>) =>
  source.pipe(
    reduce((acc, curr) => acc > curr ? acc : curr, Number.MIN_SAFE_INTEGER),
  );

/**
 * Returns the lowest number in the array
 */
export const min = () => (source: $<number>) =>
  source.pipe(
    reduce((acc, curr) => acc < curr ? acc : curr, Number.MAX_SAFE_INTEGER),
  );

/**
 * Returns the average of all the numbers in the array
 */
export const avg = () => (source: $<number>) =>
  source.pipe(
    reduce(([sum, count], curr) => [sum + curr, count + 1], [0, 0]),
    map(([sum, count]) => sum / count),
  );

/**
 * Returns the median of all the numbers in the array
 */
export const median = () => (source: $<number>) =>
  source.pipe(
    reduce((acc, curr) => [...acc, curr], new Array<number>()),
    map((input) => {
      const sorted = input.toSorted((a, b) => a - b);
      const mid = Math.floor(sorted.length / 2);
      return sorted.length % 2 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;
    }),
  );

/**
 * Sorts the array numerically
 */
export const sortNums = () => (source: $<number>) =>
  source.pipe(
    reduce((acc, curr) => [...acc, curr], new Array<number>()),
    map((input) => input.sort((a, b) => a - b)),
  );

/**
 * Joins a stream of strings into a single string.
 * @param separator The separator to join the strings by.
 */
export const join = (separator = '') => (source: $<string>) =>
  source.pipe(
    reduce((acc, curr) => acc + curr + separator, ''),
    map((input) => separator ? input.slice(0, -separator.length) : input),
  );

/**
 * Count the amount of elements which match the predicate
 * @param predicate The predicate to match
 */
export const count = <T>(predicate?: (item: T) => boolean) => (source: $<T>) =>
  source.pipe(
    reduce((acc, curr) => acc + (predicate ? +predicate(curr) : 1), 0),
  );

/**
 * Loop over each element in the array and apply the pipe modifier
 * @param pipe The pipe modifier to apply to each element
 */
export const enumerate = <TIn, TOut>(pipe: (x: $<TIn>) => $<TOut>) => (source: $<Array<TIn>>) =>
  source.pipe(
    map((input) => from(input).pipe(pipe)),
    mergeAll(),
  );

/**
 * Check if some of the elements in the array match the predicate.
 * When they do the observable will stop taking new values and return true.
 * All the other values will be ignored.
 * @param pipe The pipe modifier to apply to each element
 */
export const some = <TIn>(pipe: (x: $<TIn>) => $<boolean>) => (source: $<Array<TIn>>) =>
  source.pipe(
    map((input) =>
      from(input).pipe(
        pipe,
        filter(Boolean),
        take(1),
      )
    ),
    mergeAll(),
    defaultIfEmpty(false),
  );
