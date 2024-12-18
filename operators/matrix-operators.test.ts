import { assertEquals } from 'assert/equals';
import { of } from 'rxjs';
import { extractVectorNodes, getVectorNode, matrix, nodesInDirection } from './matrix-operators.ts';
import { map } from 'rxjs';
import { enumerate } from './array-operators.ts';
import { mergeAll } from 'rxjs';

Deno.test('create a matrix', () => {
  const input = of('abc\ndef\nghi');
  input.pipe(matrix()).subscribe((result) => {
    const { value: a } = result.get('0,0')!;
    assertEquals(a, 'a');
    const { value: b, coord } = result.get('1,0')!;
    assertEquals(b, 'b');
    assertEquals(coord, [1, 0]);
    const { value: h, matrix } = result.get('1,2')!;
    assertEquals(h, 'h');
    assertEquals(matrix, result);
  });
});

Deno.test('find a cell in a matrix', () => {
  const input = of('abc\ndef\nghi');
  input.pipe(
    matrix(),
    getVectorNode([1, 1]),
  ).subscribe((result) => {
    const { value } = result!;
    assertEquals(value, 'e');
  });
});

Deno.test('find a cell in a matrix from another cell', () => {
  const input = of('abc\ndef\nghi');
  input.pipe(
    matrix(),
    getVectorNode([1, 1]),
    getVectorNode([0, 2]),
  ).subscribe((result) => {
    const { value } = result!;
    assertEquals(value, 'g');
  });
});

Deno.test('get the neighbors of a cell in a matrix', () => {
  const input = of('abcde\nfghij\nklmno\npqrst\nuvwxy');
  input.pipe(
    matrix(),
    getVectorNode([2, 2]),
    nodesInDirection(1, '*'),
    map(([neighbor]) => neighbor.vector),
    extractVectorNodes(),
    mergeAll(),
  ).subscribe(({ value }) => {
    assertEquals('ghilnqrs'.includes(value), true);
    assertEquals('abcdefjkoptuvwxy'.includes(value), false);
  });
});

Deno.test('get the neighbors of a cell in a matrix with a distance of 2', () => {
  const input = of('abcde\nfghij\nklmno\npqrst\nuvwxy');
  input.pipe(
    matrix(),
    getVectorNode([2, 2]),
    nodesInDirection(2, '↑', '←', '→', '↓'),
    enumerate((neighbors) =>
      neighbors.pipe(
        map((x) => x.vector),
        extractVectorNodes(),
        mergeAll(),
      )
    ),
  ).subscribe(({ value }) => {
    assertEquals('chklnorw'.includes(value), true);
    assertEquals('abdefgijpqstuvxy'.includes(value), false);
  });
});
