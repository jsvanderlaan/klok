import { Injectable } from '@angular/core';
import { isToday, parseISO, startOfDay } from 'date-fns';
import { combineLatest, interval, map, Observable, startWith } from 'rxjs';
import { Constants } from '../constants';
import { DayInfo } from '../types';
import { Utils } from '../utils';
import { PeriodService } from './period.service';

@Injectable({
    providedIn: 'root',
})
export class DayService {
    constructor(private readonly _periodsService: PeriodService) {}

    days$: Observable<DayInfo[]> = this._periodsService.getPeriods$.pipe(
        map(periods => {
            const periodsPerDay = Utils.groupBy(periods, period => startOfDay(period.start).toISOString());
            return Object.entries(periodsPerDay).map(([key, value]) => ({
                date: parseISO(key),
                periods: value,
                isToday: isToday(parseISO(key)),
                total: Utils.totalTime(value),
            }));
        })
    );

    liveToday$: Observable<DayInfo | null> = combineLatest([
        interval(Constants.updateRateMs).pipe(startWith(0)),
        this.days$,
    ]).pipe(
        map(([, days]) => {
            let today = days.find(day => day.isToday);
            if (today === undefined) {
                return null;
            }
            if (today.periods.length === 0 || today.periods[0].end !== null) {
                return today;
            }
            const livePeriod = today.periods[0];

            return {
                ...today,
                total: Utils.totalTime([{ start: livePeriod.start, end: new Date() }, ...today.periods.slice(1)]),
            };
        })
    );
}
