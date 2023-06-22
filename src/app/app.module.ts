import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbDropdownModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { CurrentWeatherComponent } from './current-weather/current-weather.component';
import { DailyForecastComponent } from './daily-forecast/daily-forecast.component';
import { DropdownComponent } from './dropdown/dropdown.component';
import { TemperatureConversionPipe } from './shared/temperature-conversion.pipe';
import { TemperatureUnitPipe } from './shared/temperature-unit.pipe';
import { SpeedConversionPipe } from './shared/speed-conversion.pipe';
import { SpeedUnitPipe } from './shared/speed-unit.pipe';
import { WheatherIconDirective } from './shared/wheather-icon.directive';

@NgModule({
  declarations: [
    AppComponent,
    CurrentWeatherComponent,
    DailyForecastComponent,
    DropdownComponent,
    TemperatureConversionPipe,
    TemperatureUnitPipe,
    SpeedConversionPipe,
    SpeedUnitPipe,
    WheatherIconDirective,
  ],
  imports: [
    BrowserModule,
    NgbModule,
    NgbDropdownModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [],
})
export class AppModule {}
