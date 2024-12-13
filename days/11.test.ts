import { of } from 'rxjs';
import { p1, p2 } from './11.ts';
import { assertEquals } from 'assert';

const input = of('125 17');

Deno.test('it should run the first part of day 11 correctly', () => {
  const expected = 55312;
  p1(input).subscribe((result) => assertEquals(result, expected));
});

Deno.test('it should run the second part of day 11 correctly', () => {
  const expected = 65601038650482;
  p2(input).subscribe((result) => assertEquals(result, expected));
});
