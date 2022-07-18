import { AfterViewInit, Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { PeriodService } from '../services/period.service';

@Component({
    selector: 'app-period-edit-modal',
    templateUrl: './period-edit-modal.component.html',
})
export class PeriodEditModalComponent implements AfterViewInit {
    @Input() id: number | null = null;
    @Output() close: EventEmitter<boolean> = new EventEmitter<boolean>();
    @ViewChild('modal') modal!: ElementRef;

    constructor(private readonly _periodService: PeriodService) {}

    ngAfterViewInit(): void {
        this.modal.nativeElement.click();
    }

    savePeriod(): void {
        this._periodService.update({ id: this.id ?? undefined, start: new Date(), end: new Date() });
        this.closeModal();
    }

    closeModal(): void {
        this.close.emit(true);
    }
}
