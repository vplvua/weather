import { Component, Input } from '@angular/core';

import { TemperatureConversionPipe } from '../shared/temperature-conversion.pipe';
import { TemperatureUnitPipe } from '../shared/temperature-unit.pipe';
import { UnitSystem } from '../shared/unit-system.enum';
import { CitySelectService } from '../shared/city-select.service';

@Component({
  selector: 'app-current-weather',
  templateUrl: './current-weather.component.html',
  styleUrls: ['./current-weather.component.scss'],
})
export class CurrentWeatherComponent {
  @Input() unitSystem: UnitSystem;
  temperature = 26;
  weatherIcon = 'sunny';
  selectedCity: string = 'Kyiv';

  constructor(private citySelectService: CitySelectService) {
    this.unitSystem = UnitSystem.Metric;
  }

  ngOnInit() {
    this.citySelectService.selectedCity$.subscribe((city) => {
      this.selectedCity = city;
    });
  }
}
