import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbDropdownModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { CurrentWeatherComponent } from './current-weather/current-weather.component';
import { DailyForecastComponent } from './daily-forecast/daily-forecast.component';
import { DropdownComponent } from './dropdown/dropdown.component';

@NgModule({
  declarations: [
    AppComponent,
    CurrentWeatherComponent,
    DailyForecastComponent,
    DropdownComponent,
  ],
  imports: [BrowserModule, NgbModule, NgbDropdownModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
