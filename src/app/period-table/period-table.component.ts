import { Component } from '@angular/core';
import { isSameYear } from 'date-fns';
import { map, Observable } from 'rxjs';
import { Constants } from '../constants';
import { DayService } from '../services/day.service';
import { DayInfo } from '../types';

@Component({
    selector: 'app-period-table',
    templateUrl: './period-table.component.html',
})
export class PeriodTableComponent {
    daysWithoutToday$: Observable<DayInfo[]>;
    liveToday$: Observable<DayInfo | null>;
    defaultTimeFormat = Constants.defaultTimeFormat;

    modalOpened: boolean = false;
    selectedPeriodId: number | null = null;

    constructor(dayService: DayService) {
        this.daysWithoutToday$ = dayService.days$.pipe(map(days => days.filter(day => !day.isToday)));
        this.liveToday$ = dayService.liveToday$;
    }

    isThisYear(date: Date): boolean {
        return isSameYear(date, new Date());
    }

    openModal(periodId: number): void {
        this.selectedPeriodId = periodId;
        this.modalOpened = true;
    }

    closeModal(): void {
        this.selectedPeriodId = null;
        this.modalOpened = false;
    }
}
