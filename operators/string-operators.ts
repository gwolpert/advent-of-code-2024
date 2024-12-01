import { groupBy, mergeMap, tap, map, type Observable as $, reduce, of } from 'rxjs';

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
