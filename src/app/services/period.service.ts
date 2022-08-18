import { Injectable, OnDestroy } from '@angular/core';
import { isBefore, isSameDay } from 'date-fns';
import { liveQuery } from 'dexie';
import { from, map, Observable, shareReplay, Subject, Subscription, switchMap, take } from 'rxjs';
import { db } from '../db';
import { Period } from '../types';
import { Utils } from '../utils';

@Injectable({
    providedIn: 'root',
})
export class PeriodService implements OnDestroy {
    private readonly _sub = new Subscription();
    private _periods$: Subject<Period[]> = new Subject<Period[]>();
    private _validatedPeriods$ = this._periods$.pipe(
        map(periods => [...periods].sort(({ start: start1 }, { start: start2 }) => start2.getTime() - start1.getTime())),
        shareReplay(1)
    );

    getPeriods$: Observable<Period[]> = this._validatedPeriods$;

    constructor() {
        this._sub.add(liveQuery(() => db.periods.toArray()).subscribe(periods => this._periods$.next(periods)));
    }

    ngOnDestroy(): void {
        this._sub.unsubscribe();
    }

    klok(dateTime: Date): Observable<number> {
        return this._validatedPeriods$.pipe(
            take(1),
            switchMap(periods => {
                const existingPeriodsInSameDay = periods.filter(
                    period => isSameDay(period.start, dateTime) && isBefore(period.start, dateTime)
                );
                const targetPeriod = Utils.max(existingPeriodsInSameDay, period => period.start.getTime());
                console.log(existingPeriodsInSameDay, targetPeriod);

                return from(
                    targetPeriod && targetPeriod.end === null
                        ? db.periods.update(targetPeriod, { end: dateTime })
                        : db.periods.add({ start: dateTime, end: null })
                );
            })
        );
    }

    update(period: Period): Observable<number> {
        return from(db.periods.update(period.id!, period));
    }

    delete(id: number): Observable<void> {
        return from(db.periods.delete(id));
    }
}
