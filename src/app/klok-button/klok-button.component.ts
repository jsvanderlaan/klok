import { Component, OnInit } from '@angular/core';
import { addMinutes, differenceInMinutes, endOfDay, startOfDay } from 'date-fns';
import { BehaviorSubject, combineLatest, delay, map, Observable, switchMap, take, tap } from 'rxjs';
import { DayService } from '../services/day.service';
import { PeriodService } from '../services/period.service';

@Component({
    selector: 'app-klok-button',
    templateUrl: './klok-button.component.html',
})
export class KlokButtonComponent implements OnInit {
    private readonly _addedMinutes$ = new BehaviorSubject<number>(0);
    bliep: boolean = false;
    time$: Observable<Date> | null = null;

    constructor(private readonly _periodsService: PeriodService, private readonly _dayService: DayService) {}

    ngOnInit(): void {
        this.time$ = combineLatest([this._dayService.liveTime$, this._addedMinutes$]).pipe(
            map(([time, addedMinutes]) => addMinutes(time, addedMinutes))
        );
    }

    onClick(): void {
        this.time$
            ?.pipe(
                take(1),
                switchMap(time => this._periodsService.klok(time))
            )
            .pipe(
                tap(() => {
                    this.bliep = true;
                    this._addedMinutes$.next(0);
                }),
                delay(3000),
                tap(() => (this.bliep = false))
            )
            .subscribe();
    }

    addMinutes(amount: number): void {
        const now = new Date();
        const minMinutes = differenceInMinutes(startOfDay(now), now);
        const maxMinutes = differenceInMinutes(endOfDay(now), now);

        const add = this._addedMinutes$.value + amount;
        if (add > maxMinutes) {
            this._addedMinutes$.next(maxMinutes - 1);
            return;
        }

        if (add < minMinutes) {
            this._addedMinutes$.next(minMinutes + 1);
            return;
        }

        this._addedMinutes$.next(add);
    }
}
