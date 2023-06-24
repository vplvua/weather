import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { UnitSystem } from '../shared/unit-system.enum';
import { CityWeather } from '../shared/interfaces/city-weather.interface';
import { CitySelectService } from '../shared/services/city-select.service';
import { StorageService } from '../shared/services/storage.service';
import { WeatherCodeService } from '../shared/services/weather-code.service';
import { WeatherService } from '../shared/services/weather.service';

@Component({
  selector: 'app-daily-forecast',
  templateUrl: './daily-forecast.component.html',
  styleUrls: ['./daily-forecast.component.scss'],
})
export class DailyForecastComponent implements OnInit, OnDestroy {
  @Input() unitSystem: UnitSystem;
  temperature = [26.1, 26.7, 27.5, 28.2];
  cityWeather: CityWeather = {
    city: 'Kyiv',
    timestamp: 0,
    weather: [
      {
        humidity: 0,
        precipitationProbability: 0,
        temperature: 0,
        weatherCode: 0,
        windSpeed: 0,
      },
    ],
  };

  private subscription = new Subscription();

  constructor(
    private citySelectService: CitySelectService,
    private storageService: StorageService,
    private weatherCodeService: WeatherCodeService,
    private weatherService: WeatherService
  ) {
    this.unitSystem = UnitSystem.Metric;
  }

  ngOnInit() {
    this.subscription.add(
      this.citySelectService.getSelectedCity().subscribe((selectedCity) => {
        const storedCityWeather = this.storageService.selectCityWeather(
          selectedCity.name
        );
        if (
          storedCityWeather &&
          this.storageService.checkTimestamp(selectedCity.name)
        ) {
          this.cityWeather = storedCityWeather;
        }
      })
    );
  }

  getWeatherIcon(index: number): string {
    return (
      this.weatherCodeService.getWeatherCodeIcon(
        this.cityWeather.weather[index].weatherCode
      ) || 'sunny'
    );
  }

  getTemperature(index: number): number {
    return this.cityWeather.weather[index].temperature;
  }

  getTime(hoursToAdd: number): string {
    const date = new Date(this.cityWeather.timestamp * 1000);
    date.setHours(date.getHours() + hoursToAdd);
    const options: {} = {
      hour: '2-digit',
      minute: '2-digit',
      timeZone: 'Europe/Kiev',
    };
    return new Intl.DateTimeFormat('en-GB', options).format(date);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
