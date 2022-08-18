import { differenceInMilliseconds, isAfter, startOfMonth } from 'date-fns';
import { DayInfo, FilterType, Period } from './types';

const filterMap = new Map<FilterType, (day: DayInfo) => boolean>([
    [FilterType.Month, day => isAfter(day.date, startOfMonth(new Date()))],
    [FilterType.All, _ => true],
]);

export class Utils {
    static add: <T>(arr: T[], selector: (value: T) => number) => number = (arr, selector) =>
        arr.reduce((prev, curr) => prev + selector(curr), 0);

    static max = <T>(arr: T[], selector: (value: T) => number): T | null =>
        arr.reduce<T | null>((prev, curr) => (prev === null || selector(prev) < selector(curr) ? curr : prev), null as T | null);

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
        return Math.trunc(milliseconds / (1000 * 60 * 60));
    }

    static msToMinutes(milliseconds: number): number {
        return Math.trunc((milliseconds % (1000 * 60 * 60)) / (1000 * 60));
    }

    static filter(filter: FilterType): (day: DayInfo) => boolean {
        return filterMap.get(filter)!;
    }
}
