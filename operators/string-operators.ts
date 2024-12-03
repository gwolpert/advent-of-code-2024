import { map, mergeMap, type Observable as $, of, reduce } from 'rxjs';
import { mergeAll } from 'npm:rxjs';

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
		mergeAll(),
	);
