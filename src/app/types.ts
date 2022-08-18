export interface Period {
    id?: number;
    start: Date;
    end: Date | null;
}

export interface DayInfo {
    date: Date;
    periods: Period[];
    isToday: boolean;
    totalMs: number;
}

export enum PageType {
    Periods = 'Periodes',
    Balans = 'Balans',
}

export enum FilterType {
    Month = 'Deze maand',
    All = 'Alles',
}

export interface FilterPeriod {
    start: Date;
    end: Date;
}

export interface State {
    key: string;
    value: string;
}
