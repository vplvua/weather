import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';

import { UnitSystem } from './shared/unit-system.enum';
import { WeatherService } from './shared/services/weather.service';
import { CityWeather } from './shared/interfaces/city-weather.interface';
import { CitySelectService } from './shared/services/city-select.service';
import { StorageService } from './shared/services/storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  toggleUnitSystem = new FormControl(false);
  unitSystem: UnitSystem;
  cityWeather!: CityWeather | undefined;

  subscription: Subscription = new Subscription();

  constructor(
    private weatherService: WeatherService,
    private citySelectService: CitySelectService,
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

  private initializeCityWeather(): void {
    this.subscription.add(
      this.citySelectService.getSelectedCity().subscribe((selectedCity) => {
        const checkTimestampStamp = this.storageService.checkTimestamp(
          selectedCity.name
        );

        if (!checkTimestampStamp) {
          this.weatherService.getCityWeather(
            selectedCity.name,
            selectedCity.coordinates.lat,
            selectedCity.coordinates.lng
          );
        } else {
          this.weatherService.updateCityWeather(selectedCity.name);
        }
      })
    );
    this.subscription.add(
      this.weatherService.getCityWeather$().subscribe((cityWeather) => {
        this.cityWeather = cityWeather;
      })
    );
  }

  ngOnInit(): void {
    this.initializeCityWeather();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
