import Dexie, { Table } from 'dexie';
import { environment } from 'src/environments/environment';
import { Period } from './types';

export class PeriodDB extends Dexie {
    periods!: Table<Period, number>;

    constructor() {
        super('klok');
        this.version(1).stores({
            periods: '++id, start',
        });
        if (!environment.production) {
            this.on('populate', () => this.populateTestData());
        }
    }

    async populateTestData() {
        await db.periods.bulkAdd(testPeriods);
    }
}

export const db = new PeriodDB();

const testPeriods: Period[] = [
    [new Date(2000, 6, 16, 8, 15, 5), new Date(2000, 6, 16, 12, 0, 0)],
    [new Date(2000, 6, 16, 12, 15, 5), new Date(2000, 6, 16, 16, 35, 55)],
    [new Date(2001, 6, 16, 8, 15, 5), new Date(2001, 6, 16, 12, 0, 0)],
    [new Date(2001, 6, 16, 12, 15, 5), new Date(2001, 6, 16, 16, 35, 55)],
    [new Date(2002, 6, 16, 8, 15, 5), new Date(2002, 6, 16, 12, 0, 0)],
    [new Date(2002, 6, 16, 12, 15, 5), new Date(2002, 6, 16, 16, 35, 55)],
    [new Date(2003, 6, 16, 8, 15, 5), new Date(2003, 6, 16, 12, 0, 0)],
    [new Date(2003, 6, 16, 12, 15, 5), new Date(2003, 6, 16, 16, 35, 55)],
    [new Date(2004, 6, 16, 8, 15, 5), new Date(2004, 6, 16, 12, 0, 0)],
    [new Date(2004, 6, 16, 12, 15, 5), new Date(2004, 6, 16, 16, 35, 55)],
    [new Date(2005, 6, 16, 8, 15, 5), new Date(2005, 6, 16, 12, 0, 0)],
    [new Date(2005, 6, 16, 12, 15, 5), new Date(2005, 6, 16, 16, 35, 55)],
    [new Date(2006, 6, 16, 8, 15, 5), new Date(2006, 6, 16, 12, 0, 0)],
    [new Date(2006, 6, 16, 12, 15, 5), new Date(2006, 6, 16, 16, 35, 55)],
    [new Date(2007, 6, 16, 8, 15, 5), new Date(2007, 6, 16, 12, 0, 0)],
    [new Date(2007, 6, 16, 12, 15, 5), new Date(2007, 6, 16, 16, 35, 55)],
    [new Date(2008, 6, 16, 8, 15, 5), new Date(2008, 6, 16, 12, 0, 0)],
    [new Date(2008, 6, 16, 12, 15, 5), new Date(2008, 6, 16, 16, 35, 55)],
    [new Date(2009, 6, 16, 8, 15, 5), new Date(2009, 6, 16, 12, 0, 0)],
    [new Date(2009, 6, 16, 12, 15, 5), new Date(2009, 6, 16, 16, 35, 55)],
    [new Date(2010, 6, 16, 8, 15, 5), new Date(2010, 6, 16, 12, 0, 0)],
    [new Date(2010, 6, 16, 12, 15, 5), new Date(2010, 6, 16, 16, 35, 55)],
    [new Date(2011, 6, 16, 8, 15, 5), new Date(2011, 6, 16, 12, 0, 0)],
    [new Date(2011, 6, 16, 12, 15, 5), new Date(2011, 6, 16, 16, 35, 55)],
    [new Date(2012, 6, 16, 8, 15, 5), new Date(2012, 6, 16, 12, 0, 0)],
    [new Date(2012, 6, 16, 12, 15, 5), new Date(2012, 6, 16, 16, 35, 55)],
    [new Date(2013, 6, 16, 8, 15, 5), new Date(2013, 6, 16, 12, 0, 0)],
    [new Date(2013, 6, 16, 12, 15, 5), new Date(2013, 6, 16, 16, 35, 55)],
    [new Date(2014, 6, 16, 8, 15, 5), new Date(2014, 6, 16, 12, 0, 0)],
    [new Date(2014, 6, 16, 12, 15, 5), new Date(2014, 6, 16, 16, 35, 55)],
    [new Date(2015, 6, 16, 8, 15, 5), new Date(2015, 6, 16, 12, 0, 0)],
    [new Date(2015, 6, 16, 12, 15, 5), new Date(2015, 6, 16, 16, 35, 55)],
    [new Date(2016, 6, 16, 8, 15, 5), new Date(2016, 6, 16, 12, 0, 0)],
    [new Date(2016, 6, 16, 12, 15, 5), new Date(2016, 6, 16, 16, 35, 55)],
    [new Date(2017, 6, 16, 8, 15, 5), new Date(2017, 6, 16, 12, 0, 0)],
    [new Date(2017, 6, 16, 12, 15, 5), new Date(2017, 6, 16, 16, 35, 55)],
    [new Date(2018, 6, 16, 8, 15, 5), new Date(2018, 6, 16, 12, 0, 0)],
    [new Date(2018, 6, 16, 12, 15, 5), new Date(2018, 6, 16, 16, 35, 55)],
    [new Date(2019, 6, 16, 8, 15, 5), new Date(2019, 6, 16, 12, 0, 0)],
    [new Date(2019, 6, 16, 12, 15, 5), new Date(2019, 6, 16, 16, 35, 55)],
    [new Date(2020, 6, 16, 8, 15, 5), new Date(2020, 6, 16, 12, 0, 0)],
    [new Date(2020, 6, 16, 12, 15, 5), null],
    [new Date(2022, 6, 16, 8, 15, 5), new Date(2022, 6, 16, 12, 0, 0)],
    [new Date(2022, 6, 16, 12, 15, 5), new Date(2022, 6, 16, 17, 0, 0)],
    // [new Date(2021, 6, 16, 8, 15, 5), new Date(2021, 6, 16, 12, 0, 0)],
    // [new Date(2021, 6, 16, 12, 15, 5), new Date(2021, 6, 16, 16, 35, 55)],
    // [new Date(2022, 6, 15, 8, 15, 5), new Date(2022, 6, 15, 12, 0, 0)],
    // [new Date(2022, 6, 15, 12, 15, 5), new Date(2022, 6, 15, 16, 35, 55)],
    // [subMinutes(new Date(), 270), subMinutes(new Date(), 30)],
].map(([start, end]) => ({ start, end } as Period));
