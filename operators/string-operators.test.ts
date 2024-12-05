import { of } from 'rxjs';
import { assertEquals } from 'assert';
import { match, splitRows } from './string-operators.ts';

Deno.test('splitting a string into an array of strings based on newline characters', () => {
  const input = of('a\nb\nc');
  let index = 0;
  input.pipe(splitRows()).subscribe((result) => {
    assertEquals(result, ['a', 'b', 'c'][index++]);
  });
});

Deno.test('splitting a string into an array of strings based on two newline characters', () => {
  const input = of('a\n\nb\nc');
  let index = 0;
  input.pipe(splitRows(2)).subscribe((result) => {
    assertEquals(result, ['a', 'b\nc'][index++]);
  });
});

Deno.test('matching a string based on a regex', () => {
  const input = of('a1b2c3');
  let index = 0;
  input.pipe(match(/(\w)(\d)/g)).subscribe((result) => {
    const [match, group1, group2] = result;
    assertEquals(match, ['a1', 'b2', 'c3'][index]);
    assertEquals(group1, ['a', 'b', 'c'][index]);
    assertEquals(group2, ['1', '2', '3'][index]);
    assertEquals(result.index, [0, 2, 4][index]);
    index++;
  });
});
