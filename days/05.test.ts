import { of } from 'rxjs';
import { p1, p2 } from './05.ts';
import { assertEquals } from 'assert';

const input = of(`
47|53
97|13
97|61
97|47
75|29
61|13
75|53a
29|13
97|29
53|29
61|53
97|53
61|29
47|13
75|47
97|75
47|61
75|61
47|29
75|13
53|13

75,47,61,53,29
97,61,53,29,13
75,29,13
75,97,47,61,53
61,13,29
97,13,75,29,47
`);

Deno.test('it should run the first part of day 05 correctly', () => {
  const expected = 143;
  p1(input).subscribe((result) => assertEquals(result, expected));
});

Deno.test('it should run the second part of day 05 correctly', () => {
  const expected = 123;
  p2(input).subscribe((result) => assertEquals(result, expected));
});
