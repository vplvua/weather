import { Component, Input } from '@angular/core';
import { Subscription } from 'rxjs';

import { TemperatureConversionPipe } from '../shared/temperature-conversion.pipe';
import { TemperatureUnitPipe } from '../shared/temperature-unit.pipe';
import { UnitSystem } from '../shared/unit-system.enum';
import { CitySelectService } from '../shared/city-select.service';
import { WeatherService } from '../shared/weather.service';
import { CityWeather } from '../shared/city-weather.interface';
import { City } from '../shared/city.interface';
import { WeatherCodeService } from '../shared/weather-code.service';

@Component({
  selector: 'app-current-weather',
  templateUrl: './current-weather.component.html',
  styleUrls: ['./current-weather.component.scss'],
})
export class CurrentWeatherComponent {
  @Input() unitSystem: UnitSystem;
  currentDate: Date = new Date();
  temperature = 0;
  weatherIcon = 'sunny';
  selectedCity: City = {
    name: 'Kyiv',
    coordinates: {
      lat: 50.4501,
      lng: 30.5234,
    },
  };
  cityWeather: CityWeather = {
    city: '',
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

  private subscription: Subscription = new Subscription();

  constructor(
    private citySelectService: CitySelectService,
    private weatherService: WeatherService,
    private weatherCodeService: WeatherCodeService
  ) {
    this.unitSystem = UnitSystem.Metric;

    this.subscription.add(
      this.weatherService.getCityWeather$().subscribe((cityWeather) => {
        this.cityWeather = cityWeather;
      })
    );
  }

  getTemperature() {
    return this.cityWeather.weather[0].temperature;
  }

  getCityName() {
    return this.cityWeather.city;
  }

  geetWeatherDescription(weatherCode: number) {
    return this.weatherCodeService.getWeatherCodeDescription(weatherCode);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
