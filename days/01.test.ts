import { of } from 'rxjs';
import { p1, p2 } from './01.ts';
import { assertEquals } from 'assert';

const input = of('3   4\n4   3\n2   5\n1   3\n3   9\n3   3');

Deno.test('it should run the first part of day 01 correctly', () => {
  const expected = 11;
  p1(input).subscribe((result) => assertEquals(result, expected));
});

Deno.test('it should run the second part of day 01 correctly', () => {
  const expected = 31;
  p2(input).subscribe((result) => assertEquals(result, expected));
});
