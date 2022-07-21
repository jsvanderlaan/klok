import { Injectable, OnDestroy } from '@angular/core';
import { isSameDay } from 'date-fns';
import { liveQuery } from 'dexie';
import { from, map, Observable, shareReplay, Subject, Subscription, switchMap, take } from 'rxjs';
import { db } from '../db';
import { Period } from '../types';

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
            switchMap(periods =>
                from(
                    periods.length === 0 || !isSameDay(periods[0].start, dateTime) || periods[0].end !== null
                        ? db.periods.add({ start: dateTime, end: null })
                        : db.periods.update(periods[0], { end: dateTime })
                )
            )
        );
    }

    update(period: Period): Observable<number> {
        return from(db.periods.update(period.id!, period));
    }

    delete(id: number): Observable<void> {
        return from(db.periods.delete(id));
    }
}
