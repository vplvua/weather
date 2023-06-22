import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

import { UnitSystem } from './shared/unit-system.enum';
import { WeatherService } from './shared/weather.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  unitSystem = UnitSystem.Metric;
  toggleUnitSystem = new FormControl(false);

  constructor(private weatherService: WeatherService) {
    this.toggleUnitSystem.valueChanges.subscribe((value) => {
      if (value) {
        this.unitSystem = UnitSystem.Imperial;
      } else {
        this.unitSystem = UnitSystem.Metric;
      }
    });
  }

  ngOnInit() {
    this.weatherService.getWeather().subscribe((response) => {
      console.log(JSON.stringify(response));
    });
  }
}
