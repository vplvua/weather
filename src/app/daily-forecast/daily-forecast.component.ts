import { Component, Input } from '@angular/core';

import { TemperatureConversionPipe } from '../shared/temperature-conversion.pipe';
import { TemperatureUnitPipe } from '../shared/temperature-unit.pipe';
import { SpeedConversionPipe } from '../shared/speed-conversion.pipe';
import { SpeedUnitPipe } from '../shared/speed-unit.pipe';
import { UnitSystem } from '../shared/unit-system.enum';

@Component({
  selector: 'app-daily-forecast',
  templateUrl: './daily-forecast.component.html',
  styleUrls: ['./daily-forecast.component.scss'],
})
export class DailyForecastComponent {
  @Input() unitSystem: UnitSystem;
  temperature = [26.1, 26.7, 27.5, 28.2];
  weatherIcon = 'cloudy';

  constructor() {
    this.unitSystem = UnitSystem.Metric;
  }
}
