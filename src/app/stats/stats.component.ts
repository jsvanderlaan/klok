import { Component, OnInit } from '@angular/core';
import { isAfter, startOfMonth } from 'date-fns';
import { map, Observable } from 'rxjs';
import { Constants } from '../constants';
import { DayService } from '../services/day.service';
import { Utils } from '../utils';

@Component({
    selector: 'app-stats',
    templateUrl: './stats.component.html',
})
export class StatsComponent implements OnInit {
    relativeTotalMs$: Observable<number>;
    relativeMonthMs$: Observable<number>;

    constructor(dayService: DayService) {
        const daysBeforeToday$ = dayService.days$.pipe(map(days => days.filter(day => !day.isToday)));

        this.relativeTotalMs$ = daysBeforeToday$.pipe(map(days => Utils.add(days, day => day.totalMs - Constants.workDayMs)));
        this.relativeMonthMs$ = daysBeforeToday$.pipe(
            map(days =>
                Utils.add(
                    days.filter(day => isAfter(day.date, startOfMonth(new Date()))),
                    day => day.totalMs - Constants.workDayMs
                )
            )
        );
    }

    ngOnInit(): void {}
}
