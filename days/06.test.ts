import { of } from 'rxjs';
import { p1, p2 } from './06.ts';
import { assertEquals } from 'assert';

const input = of(`
....#.....
.........#
..........
..#.......
.......#..
..........
.#..^.....
........#.
#.........
......#...
`);

Deno.test('it should run the first part of day 06 correctly', () => {
  const expected = 41;
  p1(input).subscribe((result) => assertEquals(result, expected));
});

Deno.test('it should run the second part of day 06 correctly', () => {
  const expected = 6;
  p2(input).subscribe((result) => assertEquals(result, expected));
});
