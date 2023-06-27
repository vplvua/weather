import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { UnitSystem } from '../shared/unit-system.enum';
import { WeatherService } from '../shared/services/weather.service';
import { CityWeather } from '../shared/interfaces/city-weather.interface';

@Component({
  selector: 'app-current-weather',
  templateUrl: './current-weather.component.html',
  styleUrls: ['./current-weather.component.scss'],
})
export class CurrentWeatherComponent implements OnInit, OnDestroy {
  @Input() unitSystem: UnitSystem;
  currentDate: Date = new Date();
  cityWeather!: CityWeather;

  private subscription: Subscription = new Subscription();

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

  getTemperature(): number {
    return this.cityWeather.weather[0].temperature;
  }

  getCityName(): string {
    return this.cityWeather.city;
  }

  geetWeatherDescription(): string {
    return this.cityWeather.weather[0].weatherDescription;
  }

  getWeatherIcon(): string {
    return this.cityWeather.weather[0].nameIconFile;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
