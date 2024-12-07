import { of } from 'rxjs';
import { p1, p2 } from './07.ts';
import { assertEquals } from 'assert';

const input = of(`
190: 10 19
3267: 81 40 27
83: 17 5
156: 15 6
7290: 6 8 6 15
161011: 16 10 13
192: 17 8 14
21037: 9 7 18 13
292: 11 6 16 20
`);

Deno.test('it should run the first part of day 07 correctly', () => {
  const expected = 3749;
  p1(input).subscribe((result) => assertEquals(result, expected));
});

Deno.test('it should run the second part of day 07 correctly', () => {
  const expected = 11387;
  p2(input).subscribe((result) => assertEquals(result, expected));
});
