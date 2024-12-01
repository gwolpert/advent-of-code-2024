import { of } from 'rxjs';
import { assertEquals } from 'assert';
import { avg, count, max, min, product, sortNums, sum } from './array-operators.ts';

Deno.test('calculating the sum of an array of positive numbers', () => {
	const array = of(5, 2, 3, 4, 1);
	array.pipe(sum()).subscribe((result) => {
		assertEquals(result, 15);
	});
});

Deno.test('calculating the sum of an array with negative numbers', () => {
	const array = of(5, -2, 3, -4, 1);
	array.pipe(sum()).subscribe((result) => {
		assertEquals(result, 3);
	});
});

Deno.test('calculating the product of an array of positive numbers', () => {
	const array = of(2, 3, 4);
	array.pipe(product()).subscribe((result) => {
		assertEquals(result, 24);
	});
});

Deno.test('calculating the product of an array with fractions', () => {
	const array = of(0.5, 0.2, 2);
	array.pipe(product()).subscribe((result) => {
		assertEquals(result, 0.2);
	});
});

Deno.test('getting the highest number in an array of positive numbers', () => {
	const array = of(5, 2, 3, 4, 1);
	array.pipe(max()).subscribe((result) => {
		assertEquals(result, 5);
	});
});

Deno.test('getting the highest number in an array with negative numbers', () => {
	const array = of(-5, -2, -3, -4, -1);
	array.pipe(max()).subscribe((result) => {
		assertEquals(result, -1);
	});
});

Deno.test('getting the lowest number in an array of positive numbers', () => {
	const array = of(5, 2, 3, 4, 1);
	array.pipe(min()).subscribe((result) => {
		assertEquals(result, 1);
	});
});

Deno.test('getting the lowest number in an array with negative numbers', () => {
	const array = of(-5, -2, -3, -4, -1);
	array.pipe(min()).subscribe((result) => {
		assertEquals(result, -5);
	});
});

Deno.test('calculating the average of an array of numbers', () => {
	const array = of(5, 2, 3, 4, 1);
	array.pipe(avg()).subscribe((result) => {
		assertEquals(result, 3);
	});
});

Deno.test('calculating the average of an array with negative numbers', () => {
	const array = of(5, -2, 3, -4, 1);
	array.pipe(avg()).subscribe((result) => {
		assertEquals(result, 0.6);
	});
});

Deno.test('sorting numbers in ascending order', () => {
	const array = of(5, 2, 3, 4, 1);
	array.pipe(sortNums()).subscribe((result) => {
		assertEquals(result, [1, 2, 3, 4, 5]);
	});
});

Deno.test('sorting an array with negative numbers', () => {
	const array = of(5, -2, 3, -4, 1);
	array.pipe(sortNums()).subscribe((result) => {
		assertEquals(result, [-4, -2, 1, 3, 5]);
	});
});

Deno.test('counting the total number of elements in an array', () => {
	const array = of(5, 2, 3, 4, 1);
	array.pipe(count()).subscribe((result) => {
		assertEquals(result, 5);
	});
});

Deno.test('counting elements that match a condition', () => {
	const array = of(5, 2, 3, 4, 1);
	array.pipe(count((item) => item > 2)).subscribe((result) => {
		assertEquals(result, 3);
	});
});

Deno.test('counting elements with a predicate and negative numbers', () => {
	const array = of(5, -2, 3, -4, 1);
	array.pipe(count((item) => item > 0)).subscribe((result) => {
		assertEquals(result, 3);
	});
});
