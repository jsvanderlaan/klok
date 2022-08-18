import { Injectable } from '@angular/core';
import { isToday, parseISO, startOfDay } from 'date-fns';
import { combineLatest, interval, map, Observable, startWith } from 'rxjs';
import { Constants } from '../constants';
import { DayInfo, Period } from '../types';
import { Utils } from '../utils';
import { PeriodService } from './period.service';
import { StateService } from './state.service';

@Injectable({
    providedIn: 'root',
})
export class DayService {
    constructor(private readonly _periodsService: PeriodService, private readonly _stateService: StateService) {}

    days$: Observable<DayInfo[]> = this._periodsService.getPeriods$.pipe(map(DayService._periodsToDayInfos));

    liveDays$: Observable<DayInfo[]> = combineLatest([interval(Constants.updateRateMs).pipe(startWith(0)), this.days$]).pipe(
        map(([, days]) => {
            const liveToday = DayService._getLiveToday(days);
            return liveToday ? [liveToday, ...days.slice(1)] : days;
        })
    );

    filteredLiveDays$: Observable<DayInfo[]> = combineLatest([this._stateService.filter$, this.liveDays$]).pipe(
        map(([filter, days]) => days.filter(Utils.filter(filter)))
    );

    liveToday$: Observable<DayInfo | null> = combineLatest([
        interval(Constants.updateRateMs).pipe(startWith(0)),
        this.days$,
    ]).pipe(map(([, days]) => DayService._getLiveToday(days)));

    liveTime$: Observable<Date> = interval(Constants.updateRateMs)
        .pipe(startWith(0))
        .pipe(map(() => new Date()));

    private static _periodsToDayInfos: (periods: Period[], _: number) => DayInfo[] = periods => {
        const periodsPerDay = Utils.groupBy(periods, period => startOfDay(period.start).toISOString());
        return Object.entries(periodsPerDay).map(([key, value]) => ({
            date: parseISO(key),
            periods: value,
            isToday: isToday(parseISO(key)),
            totalMs: Utils.totalTimeMs(value),
        }));
    };

    private static _getLiveToday(days: DayInfo[]): DayInfo | null {
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
            totalMs: Utils.totalTimeMs([{ start: livePeriod.start, end: new Date() }, ...today.periods.slice(1)]),
        };
    }
}
