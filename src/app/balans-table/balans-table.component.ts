import { Component } from '@angular/core';
import { isSameYear } from 'date-fns';
import { Observable } from 'rxjs';
import { Constants } from '../constants';
import { DayService } from '../services/day.service';
import { DayInfo } from '../types';

@Component({
    selector: 'app-balans-table',
    templateUrl: './balans-table.component.html',
})
export class BalansTableComponent {
    days$: Observable<DayInfo[]>;
    constructor(dayService: DayService) {
        this.days$ = dayService.filteredLiveDays$;
    }

    isThisYear(date: Date): boolean {
        return isSameYear(date, new Date());
    }

    balans(day: DayInfo): number {
        return day.totalMs - Constants.workDayMs;
    }
}
