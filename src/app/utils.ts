import { differenceInMilliseconds } from 'date-fns';
import { Period } from './types';

export class Utils {
    static add: <T>(arr: T[], selector: (value: T) => number) => number = (arr, selector) =>
        arr.reduce((prev, curr) => prev + selector(curr), 0);

    static groupBy = <T>(arr: T[], keyF: (item: T) => string): { [key: string]: T[] } => {
        return arr.reduce((curr, next) => {
            (curr[keyF(next)] = curr[keyF(next)] || []).push(next);
            return curr;
        }, {} as { [key: string]: T[] });
    };

    static totalTimeMs(periods: Period[]): number {
        const milliseconds = Utils.add(
            periods.filter(({ end }) => end !== null),
            ({ start, end }) => differenceInMilliseconds(end!, start)
        );
        return milliseconds;
    }

    static msToHours(milliseconds: number): number {
        return Math.floor(milliseconds / (1000 * 60 * 60));
    }

    static msToMinutes(milliseconds: number): number {
        return Math.floor((milliseconds % (1000 * 60 * 60)) / (1000 * 60));
    }
}
