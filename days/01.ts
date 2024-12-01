import {Solution} from '@types';
import {count, splitRows} from "@operators";

export const p1: Solution = (source) => source.pipe(
    splitRows(),
    count()
);

export const p2: Solution = (source) => source.pipe(
    splitRows(),
    count()
);
