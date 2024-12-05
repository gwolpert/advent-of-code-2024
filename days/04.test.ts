import { of } from 'rxjs';
import { p1, p2 } from './04.ts';
import { assertEquals } from 'assert';

const input = of(
	`MMMSXXMASM\nMSAMXMSMSA\nAMXSXMAAMM\nMSAMASMSMX\nXMASAMXAMM\nXXAMMXXAMA\nSMSMSASXSS\nSAXAMASAAA\nMAMMMXMMMM\nMXMXAXMASX`,
);

Deno.test('it should run the first part of day 04 correctly', () => {
	const expected = 18;
	p1(input).subscribe((result) => assertEquals(result, expected));
});

Deno.test('it should run the second part of day 04 correctly', () => {
	const expected = 9;
	p2(input).subscribe((result) => assertEquals(result, expected));
});
