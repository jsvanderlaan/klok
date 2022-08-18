import { Component } from '@angular/core';
import { isAfter, startOfMonth } from 'date-fns';
import { map, Observable } from 'rxjs';
import { Constants } from '../constants';
import { DayService } from '../services/day.service';
import { Utils } from '../utils';

@Component({
    selector: 'app-stats',
    templateUrl: './stats.component.html',
})
export class StatsComponent {
    timeStats: TimeStat[] = [
        {
            ms$: this._dayService.liveToday$.pipe(map(today => today?.totalMs ?? 0)),
            title: 'Vandaag',
            balans: false,
            footer: null,
        },
        {
            ms$: this._dayService.days$.pipe(
                map(days =>
                    Utils.add(
                        days.filter(day => !day.isToday && isAfter(day.date, startOfMonth(new Date()))),
                        day => day.totalMs - Constants.workDayMs
                    )
                )
            ),
            title: 'Maand balans',
            balans: true,
            footer: 'Excl. vandaag',
        },
        {
            ms$: this._dayService.days$.pipe(
                map(days =>
                    Utils.add(
                        days.filter(day => !day.isToday),
                        day => day.totalMs - Constants.workDayMs
                    )
                )
            ),
            title: 'Totaal balans',
            balans: true,
            footer: 'Excl. vandaag',
        },
    ];

    constructor(private readonly _dayService: DayService) {
        this.ingeklokt$ = _dayService.days$.pipe(map(days => days.find(day => day.isToday)?.periods[0]?.end === null));
    }

    ingeklokt$: Observable<boolean>;
}

interface TimeStat {
    ms$: Observable<number>;
    balans: boolean;
    title: string;
    footer: string | null;
}
