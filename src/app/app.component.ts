import { Component } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { PeriodService } from './services/period.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
})
export class AppComponent {
    anyPeriods$: Observable<boolean | null> = of(null);
    constructor(periodService: PeriodService) {
        this.anyPeriods$ = periodService.getPeriods$.pipe(map(periods => periods.length > 0));
    }
}
