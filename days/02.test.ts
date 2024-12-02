import { of } from 'rxjs';
import { p1, p2 } from './02.ts';
import { assertEquals } from 'assert';

const input = of('7 6 4 2 1\n1 2 7 8 9\n9 7 6 2 1\n1 3 2 4 5\n8 6 4 4 1\n1 3 6 7 9');

Deno.test('it should run the first part of day 02 correctly', () => {
	const expected = 2;
	p1(input).subscribe((result) => assertEquals(result, expected));
});

Deno.test('it should run the second part of day 02 correctly', () => {
	const expected = 4;
	p2(input).subscribe((result) => assertEquals(result, expected));
});
