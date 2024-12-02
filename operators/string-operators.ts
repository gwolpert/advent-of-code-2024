import { map, mergeMap, type Observable as $, of, reduce } from 'rxjs';

/**
 * Splits a string into an array of strings based on a separator.
 * @param separator The regex separator to split the string by.
 */
export const split = (separator: RegExp) => (source: $<string>) =>
	source.pipe(
		mergeMap((input) => input.trim().split(separator)),
	);

/**
 * Splits a string into an array of strings based on the amount of newline-characters.
 * @param length The amount of newline characters between each row.
 */
export const splitRows = (length = 1) => (source: $<string>) =>
	source.pipe(
		split(new RegExp(`\\n{${length}}`)),
	);

/**
 * Matches a string based on a regex and groups the results by the input string.
 * @param regex The regex to match the string by.
 */
export const match = (regex: RegExp) => (source: $<string>) =>
	source.pipe(
		map((input) => of(...input.matchAll(regex))),
	);

/**
 * Matches a string based on a regex and maps the results to a new value.
 * @param regex The regex to match the string by.
 * @param mapFn The function to map the results by.
 */
export const matchMap = <T = string>(regex: RegExp, mapFn: (match: RegExpExecArray) => T) => (source: $<string>) =>
	source.pipe(
		match(regex),
		mergeMap((matches) =>
			matches.pipe(
				reduce((acc, curr) => [...acc, mapFn(curr)], new Array<T>()),
			)
		),
	);

/**
 * Matches a string based on a regex and reduces the results to a single value.
 * @param regex The regex to match the string by.
 * @param reduceFn The function to reduce the results by.
 * @param initialValue The initial value to reduce the results by.
 */
export const matchReduce =
	<T = string>(regex: RegExp, reduceFn: (acc: T, curr: RegExpExecArray) => T, initialValue: T) => (source: $<string>) =>
		source.pipe(
			match(regex),
			mergeMap((matches) => matches),
			reduce(reduceFn, initialValue),
		);
