import { of } from 'rxjs';
import { p1, p2 } from './03.ts';
import { assertEquals } from 'assert';

Deno.test('it should run the first part of day 03 correctly', () => {
  const expected = 161;
  p1(of('xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))')).subscribe((result) =>
    assertEquals(result, expected)
  );
});

Deno.test('it should run the second part of day 03 correctly', () => {
  const expected = 48;
  p2(of("xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))")).subscribe((result) =>
    assertEquals(result, expected)
  );
});
