import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';

import { UnitSystem } from './shared/unit-system.enum';
import { WeatherService } from './shared/weather.service';
import { WeatherCodeService } from './shared/weather-code.service';
import { CityWeather } from './shared/city-weather.interface';
import { CitySelectService } from './shared/city-select.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  toggleUnitSystem = new FormControl(false);
  unitSystem: UnitSystem;
  cityWeather!: CityWeather;
  weatherCodes!: { [code: string]: string };
  selectedCity!: string;
  subscription: Subscription = new Subscription();

  constructor(
    private citySelectService: CitySelectService,
    private weatherService: WeatherService,
    private weatherCodeService: WeatherCodeService
  ) {
    this.toggleUnitSystem.valueChanges.subscribe((value) => {
      if (value) {
        this.unitSystem = UnitSystem.Imperial;
      } else {
        this.unitSystem = UnitSystem.Metric;
      }
    });

    this.unitSystem = UnitSystem.Metric;
  }

  private loadWeatherCodes() {
    this.subscription.add(
      this.weatherCodeService.getWeatherCodes().subscribe((response) => {
        this.weatherCodes = response;
      })
    );
  }

  private loadCityWeather() {
    this.subscription.add(
      this.citySelectService.getSelectedCity().subscribe((city) => {
        this.selectedCity = city.name;
        this.weatherService.getCityWeather(
          city.name,
          city.coordinates.lat,
          city.coordinates.lng
        );
      })
    );

    this.subscription.add(
      this.weatherService.getCityWeather$().subscribe((cityWeather) => {
        this.cityWeather = cityWeather;
      })
    );
  }

  ngOnInit() {
    this.loadWeatherCodes();
    this.loadCityWeather();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
