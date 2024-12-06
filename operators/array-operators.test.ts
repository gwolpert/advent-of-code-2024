import { from, last, map, tap } from 'rxjs';
import { assertEquals } from 'assert';
import { avg, count, enumerate, join, max, median, min, product, some, sortNums, sum } from './array-operators.ts';

Deno.test('calculating the sum of an array of positive numbers', () => {
  const array = from([5, 2, 3, 4, 1]);
  array.pipe(sum()).subscribe((result) => {
    assertEquals(result, 15);
  });
});

Deno.test('calculating the sum of an array with negative numbers', () => {
  const array = from([5, -2, 3, -4, 1]);
  array.pipe(sum()).subscribe((result) => {
    assertEquals(result, 3);
  });
});

Deno.test('calculating the product of an array of positive numbers', () => {
  const array = from([2, 3, 4]);
  array.pipe(product()).subscribe((result) => {
    assertEquals(result, 24);
  });
});

Deno.test('calculating the product of an array with fractions', () => {
  const array = from([0.5, 0.2, 2]);
  array.pipe(product()).subscribe((result) => {
    assertEquals(result, 0.2);
  });
});

Deno.test('getting the highest number in an array of positive numbers', () => {
  const array = from([5, 2, 3, 4, 1]);
  array.pipe(max()).subscribe((result) => {
    assertEquals(result, 5);
  });
});

Deno.test('getting the highest number in an array with negative numbers', () => {
  const array = from([-5, -2, -3, -4, -1]);
  array.pipe(max()).subscribe((result) => {
    assertEquals(result, -1);
  });
});

Deno.test('getting the lowest number in an array of positive numbers', () => {
  const array = from([5, 2, 3, 4, 1]);
  array.pipe(min()).subscribe((result) => {
    assertEquals(result, 1);
  });
});

Deno.test('getting the lowest number in an array with negative numbers', () => {
  const array = from([-5, -2, -3, -4, -1]);
  array.pipe(min()).subscribe((result) => {
    assertEquals(result, -5);
  });
});

Deno.test('calculating the average of an array of numbers', () => {
  const array = from([5, 2, 3, 4, 1]);
  array.pipe(avg()).subscribe((result) => {
    assertEquals(result, 3);
  });
});

Deno.test('calculating the average of an array with negative numbers', () => {
  const array = from([5, -2, 3, -4, 1]);
  array.pipe(avg()).subscribe((result) => {
    assertEquals(result, 0.6);
  });
});

Deno.test('calculating the median of an array with an odd number of elements', () => {
  const array = from([5, 2, 3, 4, 1]);
  array.pipe(median()).subscribe((result) => {
    assertEquals(result, 3);
  });
});

Deno.test('calculating the median of an array with an even number of elements', () => {
  const array = from([5, 2, 3, 4, 1, 6]);
  array.pipe(median()).subscribe((result) => {
    assertEquals(result, 3.5);
  });
});

Deno.test('sorting numbers in ascending order', () => {
  const array = from([5, 2, 3, 4, 1]);
  array.pipe(sortNums()).subscribe((result) => {
    assertEquals(result, [1, 2, 3, 4, 5]);
  });
});

Deno.test('sorting an array with negative numbers', () => {
  const array = from([5, -2, 3, -4, 1]);
  array.pipe(sortNums()).subscribe((result) => {
    assertEquals(result, [-4, -2, 1, 3, 5]);
  });
});

Deno.test('joining an array of strings into a single string', () => {
  const input = from(['a', 'b', 'c']);
  input.pipe(join('-')).subscribe((result) => {
    assertEquals(result, 'a-b-c');
  });
});

Deno.test('joining an array of strings into a single string with no separator', () => {
  const input = from(['a', 'b', 'c']);
  input.pipe(join()).subscribe((result) => {
    assertEquals(result, 'abc');
  });
});

Deno.test('counting the total number of elements in an array', () => {
  const array = from([5, 2, 3, 4, 1]);
  array.pipe(count()).subscribe((result) => {
    assertEquals(result, 5);
  });
});

Deno.test('enumerating the elements in an array', () => {
  let index = 0;
  const input = from([
    ['this', 'is', 'a', 'test', '1'],
    ['this', 'is', 'a', 'test', 'two'],
    ['this', 'is', 'a', 'test', 'three'],
  ]);
  input.pipe(enumerate((x) =>
    x.pipe(
      map((item) => item.length),
      sum(),
    )
  )).subscribe((result) => {
    assertEquals(result, [12, 14, 16][index++]);
  });
});

Deno.test('return true when some is true, stop when found', () => {
  const input = from([
    ['thisa', 'is', 'a', 'test', '1'],
    ['this', 'is', 'a', 'test', 'two'],
    ['this', 'is', 'a', 'test', 'three'],
  ]);
  let index = 0;

  input.pipe(
    some((x) =>
      x.pipe(
        map((item) => item.length >= 5),
      )
    ),
    tap(() => index++),
    last(),
  ).subscribe(() => {
    assertEquals(index, 2);
  });
});
