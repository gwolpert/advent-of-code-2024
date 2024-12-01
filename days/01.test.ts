import {of} from 'rxjs';
import {p1, p2} from './01.ts';
import {assertEquals} from 'assert';

const input = of('');

Deno.test('it should run the first part of day 01 correctly', () => {
  const expected = 1;
  p1(input).subscribe((result) => assertEquals(result, expected));
});

Deno.test('it should run the second part of day 01 correctly', () => {
  const expected = 1;
  p2(input).subscribe((result) => assertEquals(result, expected));
});
