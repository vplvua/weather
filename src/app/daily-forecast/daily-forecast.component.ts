import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { UnitSystem } from '../shared/unit-system.enum';
import { CityWeather } from '../shared/interfaces/city-weather.interface';
import { WeatherService } from '../shared/services/weather.service';

@Component({
  selector: 'app-daily-forecast',
  templateUrl: './daily-forecast.component.html',
  styleUrls: ['./daily-forecast.component.scss'],
})
export class DailyForecastComponent implements OnInit, OnDestroy {
  @Input() unitSystem: UnitSystem;
  cityWeather!: CityWeather;

  private subscription = new Subscription();

  constructor(private weatherService: WeatherService) {
    this.unitSystem = UnitSystem.Metric;
  }

  ngOnInit() {
    this.subscription.add(
      this.weatherService.getCityWeather$().subscribe((cityWeather) => {
        this.cityWeather = cityWeather;
      })
    );
  }

  сheckCityWeather(index: number): boolean {
    return !!(
      this.cityWeather &&
      this.cityWeather.weather &&
      this.cityWeather.weather[index]
    );
  }

  getWeatherIcon(index: number): string {
    if (this.сheckCityWeather(index)) {
      return this.cityWeather.weather[index].nameIconFile;
    }
    return 'sunny';
  }

  getTemperature(index: number): number {
    if (this.сheckCityWeather(index)) {
      return this.cityWeather.weather[index].temperature;
    }
    return 0;
  }

  getTime(hoursToAdd: number): string {
    if (!this.cityWeather) return '';
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
