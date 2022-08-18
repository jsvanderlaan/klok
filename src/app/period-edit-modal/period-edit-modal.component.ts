import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { addHours, addMinutes, startOfDay } from 'date-fns';
import { map, take } from 'rxjs';
import { PeriodService } from '../services/period.service';
import { Period } from '../types';

@Component({
    selector: 'app-period-edit-modal',
    templateUrl: './period-edit-modal.component.html',
})
export class PeriodEditModalComponent implements OnInit, AfterViewInit {
    @Input() id!: number;
    @Output() close: EventEmitter<boolean> = new EventEmitter<boolean>();
    @ViewChild('modal') modal!: ElementRef;

    controls = {
        hoursIn: new FormControl(null, Validators.required) as FormControl<number | null>,
        minutesIn: new FormControl(null, Validators.required) as FormControl<number | null>,
        hoursOut: new FormControl(null) as FormControl<number | null>,
        minutesOut: new FormControl(null) as FormControl<number | null>,
    };

    form: FormGroup = new FormGroup(this.controls);

    hourOptions: number[] = Array.from({ length: 24 }, (_, i) => i);
    minuteOptions: number[] = Array.from({ length: 60 }, (_, i) => i);

    triedSubmitting: boolean = false;

    period: Period | null = null;

    constructor(private readonly _periodService: PeriodService) {}

    ngOnInit(): void {
        this._periodService.getPeriods$
            .pipe(
                take(1),
                map(periods => periods.find(period => period.id === this.id))
            )
            .subscribe(period => {
                if (period) {
                    this.period = period;
                    this.controls.hoursIn.setValue(Math.floor(period.start.getHours()));
                    this.controls.minutesIn.setValue(Math.floor(period.start.getMinutes()));
                    if (period.end) {
                        this.controls.hoursOut.setValue(Math.floor(period.end.getHours()));
                        this.controls.minutesOut.setValue(Math.floor(period.end.getMinutes()));
                    }
                }
            });
    }

    ngAfterViewInit(): void {
        this.modal.nativeElement.click();
    }

    savePeriod(): void {
        this.triedSubmitting = true;
        if (this.form.valid && this.period !== null) {
            const start = this._getDate(this.period.start, this.controls.hoursIn.value, this.controls.minutesIn.value)!;
            const end = this._getDate(this.period.start, this.controls.hoursOut.value, this.controls.minutesOut.value);
            this._periodService.update({ id: this.id, start, end }).subscribe(() => this.closeModal());
        }
    }

    deletePeriod(): void {
        this._periodService.delete(this.id).subscribe(() => this.closeModal());
    }

    closeModal(): void {
        this.close.emit(true);
    }

    private _getDate(date: Date, hours: number | null, minutes: number | null): Date | null {
        return hours === null && minutes === null ? null : addMinutes(addHours(startOfDay(date), hours ?? 0), minutes ?? 0);
    }
}
