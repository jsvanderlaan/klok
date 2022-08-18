import { registerLocaleData } from '@angular/common';
import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import localeNl from '@angular/common/locales/nl';
import { ReactiveFormsModule } from '@angular/forms';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IconKlokComponent } from './icons/icon-klok/icon-klok.component';
import { IconWarningComponent } from './icons/icon-warning/icon-warning.component';
import { KlokButtonComponent } from './klok-button/klok-button.component';
import { PeriodEditModalComponent } from './period-edit-modal/period-edit-modal.component';
import { PeriodTableComponent } from './period-table/period-table.component';
import { StatsComponent } from './stats/stats.component';
import { TimePipe } from './time.pipe';
import { NoPeriodsComponent } from './no-periods/no-periods.component';
import { FilterComponent } from './filter/filter.component';
import { PageComponent } from './page/page.component';
import { BalansTableComponent } from './balans-table/balans-table.component';

registerLocaleData(localeNl, 'nl');

@NgModule({
    declarations: [
        AppComponent,
        PeriodTableComponent,
        KlokButtonComponent,
        IconKlokComponent,
        IconWarningComponent,
        PeriodEditModalComponent,
        StatsComponent,
        TimePipe,
        NoPeriodsComponent,
        FilterComponent,
        PageComponent,
        BalansTableComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        ServiceWorkerModule.register('ngsw-worker.js', {
            enabled: environment.production,
            // Register the ServiceWorker as soon as the application is stable
            // or after 30 seconds (whichever comes first).
            registrationStrategy: 'registerWhenStable:30000',
        }),
        ReactiveFormsModule,
    ],
    providers: [{ provide: LOCALE_ID, useValue: 'nl' }],
    bootstrap: [AppComponent],
})
export class AppModule {}
