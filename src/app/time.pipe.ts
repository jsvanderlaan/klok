import { Pipe, PipeTransform } from '@angular/core';
import { Utils } from './utils';

@Pipe({
    name: 'time',
})
export class TimePipe implements PipeTransform {
    transform(milliseconds: number | null): string {
        if (milliseconds === null) {
            return '-';
        }
        const hours = Utils.msToHours(milliseconds);
        const minutes = Utils.msToMinutes(milliseconds);

        if (hours === 0 && minutes === 0) {
            return '-';
        }

        return hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`;
    }
}
