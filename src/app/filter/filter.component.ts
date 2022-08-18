import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { StateService } from '../services/state.service';
import { FilterType, PageType } from '../types';

@Component({
    selector: 'app-filter',
    templateUrl: './filter.component.html',
})
export class FilterComponent {
    pageTypes = [PageType.Periods, PageType.Balans];
    filterTypes = [FilterType.Month, FilterType.All];
    page$: Observable<PageType>;
    filter$: Observable<FilterType>;

    constructor(private readonly _stateService: StateService) {
        this.page$ = _stateService.page$;
        this.filter$ = _stateService.filter$;
    }

    changePage(page: PageType): void {
        this._stateService.setPage(page).subscribe();
    }

    changeFilter(filter: FilterType): void {
        console.log(filter);

        this._stateService.setFilter(filter).subscribe();
    }
}
