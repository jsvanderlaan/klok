import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { StateService } from '../services/state.service';
import { PageType } from '../types';

@Component({
    selector: 'app-page',
    templateUrl: './page.component.html',
})
export class PageComponent implements OnInit {
    page$!: Observable<PageType>;
    pageType = PageType;
    constructor(private readonly _stateService: StateService) {}

    ngOnInit(): void {
        this.page$ = this._stateService.page$;
    }
}
