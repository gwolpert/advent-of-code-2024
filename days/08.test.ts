import { of } from 'rxjs';
import { p1, p2 } from './08.ts';
import { assertEquals } from 'assert';

const input = of(`
............
........0...
.....0......
.......0....
....0.......
......A.....
............
............
........A...
.........A..
............
............`);

Deno.test('it should run the first part of day 08 correctly', () => {
  const expected = 14;
  p1(input).subscribe((result) => assertEquals(result, expected));
});

Deno.test('it should run the second part of day 08 correctly', () => {
  const expected = 34;
  p2(input).subscribe((result) => assertEquals(result, expected));
});