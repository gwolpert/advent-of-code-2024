import { last, type Observable, tap } from 'rxjs';
import { ExecutionInfo, Solution } from '@types';
import { brightBlue as blue, brightYellow as yellow, underline as ul } from 'fmt/colors';

/**
 * Executes a solution function on an observable source.
 * @param solution The solution operator function to execute.
 * @param timerStart The start time of the execution
 * @param start The start time of the execution
 */
export const executeSolution =
	(solution: Solution, { day, part }: ExecutionInfo, start = performance.now()) => (source: Observable<string>) =>
		source.pipe(
			solution,
			last(),
			tap((result) => {
				const end = performance.now() - start;
				console.log(ul(blue(`Running day ${day} part ${part}:`)));
				console.log(`${yellow('[Answer]\t')} ${result}`);
				console.log(`${yellow('[Time]\t\t')} ~${end.toFixed(3)}ms\n`);
			}),
		);
