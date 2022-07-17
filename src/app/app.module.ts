import { registerLocaleData } from '@angular/common';
import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import localeNl from '@angular/common/locales/nl';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { KlokButtonComponent } from './klok-button/klok-button.component';
import { PeriodTableComponent } from './period-table/period-table.component';
import { IconKlokComponent } from './icons/icon-klok/icon-klok.component';
import { IconWarningComponent } from './icons/icon-warning/icon-warning.component';

registerLocaleData(localeNl, 'nl');

@NgModule({
    declarations: [AppComponent, PeriodTableComponent, KlokButtonComponent, IconKlokComponent, IconWarningComponent],
    imports: [BrowserModule, AppRoutingModule],
    providers: [{ provide: LOCALE_ID, useValue: 'nl' }],
    bootstrap: [AppComponent],
})
export class AppModule {}
