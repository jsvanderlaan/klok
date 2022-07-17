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
