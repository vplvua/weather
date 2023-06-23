import { Component, Input } from '@angular/core';

import { UnitSystem } from '../shared/unit-system.enum';

@Component({
  selector: 'app-daily-forecast',
  templateUrl: './daily-forecast.component.html',
  styleUrls: ['./daily-forecast.component.scss'],
})
export class DailyForecastComponent {
  @Input() unitSystem: UnitSystem;
  temperature = [26.1, 26.7, 27.5, 28.2];
  weatherIcon = 'sunny';

  constructor() {
    this.unitSystem = UnitSystem.Metric;
  }
}
