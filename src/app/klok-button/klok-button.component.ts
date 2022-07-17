import { Component, OnInit } from '@angular/core';
import { delay, tap } from 'rxjs';
import { PeriodService } from '../services/period.service';

@Component({
    selector: 'app-klok-button',
    templateUrl: './klok-button.component.html',
})
export class KlokButtonComponent implements OnInit {
    bliep: boolean = false;

    constructor(private readonly _periodsService: PeriodService) {}

    ngOnInit(): void {}

    onClick(): void {
        this._periodsService
            .klok(new Date())
            .pipe(
                tap(() => (this.bliep = true)),
                delay(3000),
                tap(() => (this.bliep = false))
            )
            .subscribe();
    }
}
