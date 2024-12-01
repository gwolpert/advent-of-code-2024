import { ensureDir } from 'fs/ensure-dir';
import { load } from 'dotenv';
import { parseArgs } from 'cli/parse-args';
import { concat, from, type Observable as $ } from 'rxjs';
import { Solution } from '@types';
import { executeSolution } from '@operators';

type Args = { day: number; part: number; scaffold: boolean };

const { day, part, scaffold } = parseArgs(Deno.args, {
	boolean: ['scaffold'],
	default: { day: 1, part: 0, scaffold: false },
}) as Args;

if (isNaN(day)) throw new Error('Day number provided is incorrect');
const dayCode = `${day}`.padStart(2, '0');

if (scaffold) {
	console.log(`Scaffolding day ${day}`);
	const template = await Deno.readTextFile('./template.ts.txt');
	const testTemplate = await Deno.readTextFile('./template.test.ts.txt');
	await ensureDir(`./days`);
	await Deno.writeTextFile(`./days/${dayCode}.ts`, template);
	await Deno.writeTextFile(`./days/${dayCode}.test.ts`, testTemplate.replaceAll('{DAY-NUMBER}', dayCode));
	Deno.exit();
}

const { ADVENT_YEAR, ADVENT_SESSION_TOKEN } = await load();
const { p1, p2 }: Record<string, Solution> = await import(`./days/${dayCode}.ts`);
const request: RequestInit = { headers: { cookie: `session=${ADVENT_SESSION_TOKEN}` } };
const response = await fetch(`https://adventofcode.com/${ADVENT_YEAR}/day/${day}/input`, request);
if (!response.ok) throw new Error('Error while fetching input, maybe your session token is expired?');
const input = from(response.text());
const parts: Array<$<number>> = [];
if (!part || part === 1) parts.push(input.pipe(executeSolution(p1, { day, part: 1 })));
if (!part || part === 2) parts.push(input.pipe(executeSolution(p2, { day, part: 2 })));
concat(...parts).subscribe();
