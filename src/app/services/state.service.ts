import { Injectable } from '@angular/core';
import { liveQuery } from 'dexie';
import { filter, from, map, Observable } from 'rxjs';
import { db } from '../db';
import { FilterType, PageType } from '../types';

@Injectable({
    providedIn: 'root',
})
export class StateService {
    page$ = from(liveQuery(() => db.state.get('page'))).pipe(
        map(state => (state?.value as PageType | undefined) ?? null),
        filter(page => !!page),
        map(page => page as PageType)
    );
    setPage(page: PageType): Observable<number> {
        return from(db.state.update('page', { value: page }));
    }

    filter$ = from(liveQuery(() => db.state.get('filter'))).pipe(
        map(state => (state?.value as FilterType | undefined) ?? null),
        filter(filter => !!filter),
        map(filter => filter as FilterType)
    );
    setFilter(filter: FilterType): Observable<number> {
        return from(db.state.update('filter', { value: filter }));
    }
}
