import { registerLocaleData } from '@angular/common';
import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import localeNl from '@angular/common/locales/nl';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IconKlokComponent } from './icons/icon-klok/icon-klok.component';
import { IconWarningComponent } from './icons/icon-warning/icon-warning.component';
import { KlokButtonComponent } from './klok-button/klok-button.component';
import { PeriodEditModalComponent } from './period-edit-modal/period-edit-modal.component';
import { PeriodTableComponent } from './period-table/period-table.component';

registerLocaleData(localeNl, 'nl');

@NgModule({
    declarations: [
        AppComponent,
        PeriodTableComponent,
        KlokButtonComponent,
        IconKlokComponent,
        IconWarningComponent,
        PeriodEditModalComponent,
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
    ],
    providers: [{ provide: LOCALE_ID, useValue: 'nl' }],
    bootstrap: [AppComponent],
})
export class AppModule {}
