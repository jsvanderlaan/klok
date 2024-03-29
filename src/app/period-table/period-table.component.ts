import { Component } from '@angular/core';
import { isSameYear } from 'date-fns';
import { Observable } from 'rxjs';
import { Constants } from '../constants';
import { DayService } from '../services/day.service';
import { DayInfo } from '../types';

@Component({
    selector: 'app-period-table',
    templateUrl: './period-table.component.html',
})
export class PeriodTableComponent {
    days$: Observable<DayInfo[]>;
    defaultTimeFormat = Constants.defaultTimeFormat;

    modalOpened: boolean = false;
    selectedPeriodId: number | null = null;

    constructor(dayService: DayService) {
        this.days$ = dayService.filteredLiveDays$;
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
