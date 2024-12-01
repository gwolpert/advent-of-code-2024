import { of } from 'rxjs';
import { assertEquals } from 'assert';
import { matchMap, splitRows } from './string-operators.ts';

Deno.test('splitting a string into an array of strings based on newline characters', () => {
	const input = of('a\nb\nc');
	const asserts = ['a', 'b', 'c'];
	let counter = 0;
	input.pipe(splitRows()).subscribe((result) => {
		assertEquals(result, asserts[counter++]);
	});
});

Deno.test('splitting a string into an array of strings based on two newline characters', () => {
	const input = of('a\n\nb\nc');
	const asserts = ['a', 'b\nc'];
	let counter = 0;
	input.pipe(splitRows(2)).subscribe((result) => {
		assertEquals(result, asserts[counter++]);
	});
});

Deno.test('matching a string and mapping the result', () => {
	const input = of('a1b2c3');
	input.pipe(matchMap(/(\w\d)/g, ([, match]) => match)).subscribe((result) => {
		assertEquals(result, ['a1', 'b2', 'c3']);
	});
});

Deno.test('matching a string and mapping the result to a number', () => {
	const input = of('a1b2c3');
	input.pipe(matchMap(/(\d)/g, ([, x]) => +x)).subscribe((result) => {
		assertEquals(result, [1, 2, 3]);
	});
});

Deno.test('matching a string with multiple groups and mapping the result', () => {
	const input = of('a1b2c3');
	input.pipe(matchMap(/(\w)(\d)/g, ([, char, num]) => `${char}${num}`)).subscribe((result) => {
		assertEquals(result, ['a1', 'b2', 'c3']);
	});
});
