import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';

import { UnitSystem } from './shared/unit-system.enum';
import { WeatherService } from './shared/services/weather.service';
import { WeatherCodeService } from './shared/services/weather-code.service';
import { CityWeather } from './shared/interfaces/city-weather.interface';
import { CitySelectService } from './shared/services/city-select.service';
import { StorageService } from './shared/services/storage.service';

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
    private weatherCodeService: WeatherCodeService,
    private storageService: StorageService
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

  private initializeCityWeather() {
    const selectedCity = this.citySelectService.getSelectedCitySync();
    const storedCityWeather = this.storageService.selectCityWeather(
      selectedCity.name
    );

    if (
      storedCityWeather &&
      !this.storageService.checkTimestamp(selectedCity.name)
    ) {
      this.cityWeather = storedCityWeather;
    } else {
      this.weatherService.getCityWeather(
        selectedCity.name,
        selectedCity.coordinates.lat,
        selectedCity.coordinates.lng
      );
      this.subscription.add(
        this.weatherService.getCityWeather$().subscribe((cityWeather) => {
          this.cityWeather = cityWeather;
          this.storageService.updateCityWeather(cityWeather);
        })
      );
    }
  }

  ngOnInit() {
    this.loadWeatherCodes();
    this.initializeCityWeather();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
