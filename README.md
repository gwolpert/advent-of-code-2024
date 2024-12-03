# Advent of Code 2024: Typescript + Rx + Deno

[![Advent of Code 2024 - Deno CI](https://github.com/gwolpert/advent-of-code-2024/actions/workflows/deno.yml/badge.svg)](https://github.com/gwolpert/advent-of-code-2024/actions/workflows/deno.yml)

This project is a collection of solutions for the [Advent of Code 2024](https://adventofcode.com/2024), written in Typescript and leveraging [RxJS (Reactive Extensions for JavaScript)](https://rxjs.dev/) on the [Deno runtime](https://deno.land/).

## What is Advent of Code?

[Advent of Code](https://adventofcode.com/) is an annual series of programming puzzles released daily from December 1st to December 25th. These puzzles challenge participants to solve a wide variety of problems, often involving parsing input, performing calculations, and exploring algorithms. The puzzles are accessible to all skill levels and provide an excellent way to improve your coding skills.

This year's puzzles are available here:
- Day 1 ([puzzle](https://adventofcode.com/2024/day/1)) ([solution](https://github.com/gwolpert/advent-of-code-2024/blob/main/days/01.ts))
- Day 2 ([puzzle](https://adventofcode.com/2024/day/2)) ([solution](https://github.com/gwolpert/advent-of-code-2024/blob/main/days/02.ts))
- Day 3 ([puzzle](https://adventofcode.com/2024/day/3)) ([solution](https://github.com/gwolpert/advent-of-code-2024/blob/main/days/03.ts))
- Day 4 ([puzzle](https://adventofcode.com/2024/day/4)) ([solution](https://github.com/gwolpert/advent-of-code-2024/blob/main/days/04.ts))
- Day 5 ([puzzle](https://adventofcode.com/2024/day/5)) ([solution](https://github.com/gwolpert/advent-of-code-2024/blob/main/days/05.ts))
- Day 6 ([puzzle](https://adventofcode.com/2024/day/6)) ([solution](https://github.com/gwolpert/advent-of-code-2024/blob/main/days/06.ts))
- Day 7 ([puzzle](https://adventofcode.com/2024/day/7)) ([solution](https://github.com/gwolpert/advent-of-code-2024/blob/main/days/07.ts))
- Day 8 ([puzzle](https://adventofcode.com/2024/day/8)) ([solution](https://github.com/gwolpert/advent-of-code-2024/blob/main/days/08.ts))
- Day 9 ([puzzle](https://adventofcode.com/2024/day/9)) ([solution](https://github.com/gwolpert/advent-of-code-2024/blob/main/days/09.ts))
- Day 10 ([puzzle](https://adventofcode.com/2024/day/10)) ([solution](https://github.com/gwolpert/advent-of-code-2024/blob/main/days/10.ts))
- Day 11 ([puzzle](https://adventofcode.com/2024/day/11)) ([solution](https://github.com/gwolpert/advent-of-code-2024/blob/main/days/11.ts))
- Day 12 ([puzzle](https://adventofcode.com/2024/day/12)) ([solution](https://github.com/gwolpert/advent-of-code-2024/blob/main/days/12.ts))
- Day 13 ([puzzle](https://adventofcode.com/2024/day/13)) ([solution](https://github.com/gwolpert/advent-of-code-2024/blob/main/days/13.ts))
- Day 14 ([puzzle](https://adventofcode.com/2024/day/14)) ([solution](https://github.com/gwolpert/advent-of-code-2024/blob/main/days/14.ts))
- Day 15 ([puzzle](https://adventofcode.com/2024/day/15)) ([solution](https://github.com/gwolpert/advent-of-code-2024/blob/main/days/15.ts))
- Day 16 ([puzzle](https://adventofcode.com/2024/day/16)) ([solution](https://github.com/gwolpert/advent-of-code-2024/blob/main/days/16.ts))
- Day 17 ([puzzle](https://adventofcode.com/2024/day/17)) ([solution](https://github.com/gwolpert/advent-of-code-2024/blob/main/days/17.ts))
- Day 18 ([puzzle](https://adventofcode.com/2024/day/18)) ([solution](https://github.com/gwolpert/advent-of-code-2024/blob/main/days/18.ts))
- Day 19 ([puzzle](https://adventofcode.com/2024/day/19)) ([solution](https://github.com/gwolpert/advent-of-code-2024/blob/main/days/19.ts))
- Day 20 ([puzzle](https://adventofcode.com/2024/day/20)) ([solution](https://github.com/gwolpert/advent-of-code-2024/blob/main/days/20.ts))
- Day 21 ([puzzle](https://adventofcode.com/2024/day/21)) ([solution](https://github.com/gwolpert/advent-of-code-2024/blob/main/days/21.ts))
- Day 22 ([puzzle](https://adventofcode.com/2024/day/22)) ([solution](https://github.com/gwolpert/advent-of-code-2024/blob/main/days/22.ts))
- Day 23 ([puzzle](https://adventofcode.com/2024/day/23)) ([solution](https://github.com/gwolpert/advent-of-code-2024/blob/main/days/23.ts))
- Day 24 ([puzzle](https://adventofcode.com/2024/day/24)) ([solution](https://github.com/gwolpert/advent-of-code-2024/blob/main/days/24.ts))
- Day 25 ([puzzle](https://adventofcode.com/2024/day/25)) ([solution](https://github.com/gwolpert/advent-of-code-2024/blob/main/days/25.ts))

## Why RxJS?

[RxJS](https://rxjs.dev/) is a library for reactive programming that uses Observables to compose data streams and transformations in a declarative, functional style. While Advent of Code puzzles are not inherently asynchronous or time-based, RxJS shines by providing an elegant way to process streams of data, making it an excellent fit for many challenges.

### Functional Programming with RxJS

RxJS encourages functional programming principles:
- **Immutability**: RxJS operators avoid mutating data, instead producing new streams.
- **Declarative**: Write code that focuses on "what" rather than "how."
- **Composable**: Chainable operators let you build complex pipelines from simple components.

This functional approach simplifies working with data processing pipelines, which is common in Advent of Code.

Check the official [RxJS Operators Documentation](https://rxjs.dev/guide/operators) for an extensive list of available operators.

### Custom Operators for Advent of Code

This project also includes custom RxJS operators tailored for common Advent of Code patterns, such as parsing input, splitting data, and aggregating results. Explore them in the repository:
- [Custom Operators](https://github.com/gwolpert/advent-of-code-2024/tree/main/operators)

## How to Use This Project

### Running Solutions
To run the solution for a specific day:
```bash
deno task start --day={day}
```

To run a specific part of a day's solution:
```bash
deno task start --day={day} --part={part}
```

### Scaffolding a New Day
To scaffold files for a new day:
```bash
deno task scaffold --day={day}
```

### Running All Tests
To run all tests for the solutions:
```bash
deno task test
```

## Setting Up Your Advent of Code Session Token

To fetch puzzle inputs programmatically, you need your Advent of Code session token:

1. Navigate to [Advent of Code](https://adventofcode.com/) and log in.
2. Open developer tools (press `F12`).
3. Go to the **Application** tab.
4. Select the cookies for the current domain.
5. Find the cookie named `session` and copy its value.
6. Set the `ADVENT_SESSION_TOKEN` field in the `.env` file with the copied token.

![Instructions](https://i.imgur.com/ygEUVE8.png "Instructions")
