import { Component, Input } from '@angular/core';
import { Subscription } from 'rxjs';

import { UnitSystem } from '../shared/unit-system.enum';
import { CitySelectService } from '../shared/services/city-select.service';
import { WeatherService } from '../shared/services/weather.service';
import { CityWeather } from '../shared/interfaces/city-weather.interface';
import { City } from '../shared/interfaces/city.interface';
import { WeatherCodeService } from '../shared/services/weather-code.service';
import { StorageService } from '../shared/services/storage.service';

@Component({
  selector: 'app-current-weather',
  templateUrl: './current-weather.component.html',
  styleUrls: ['./current-weather.component.scss'],
})
export class CurrentWeatherComponent {
  @Input() unitSystem: UnitSystem;
  currentDate: Date = new Date();
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

  private subscription: Subscription = new Subscription();

  constructor(
    private citySelectService: CitySelectService,
    private weatherService: WeatherService,
    private weatherCodeService: WeatherCodeService,
    private storageService: StorageService
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
        } else {
          this.fetchCityWeather(selectedCity);
        }
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

  getWeatherIcon(): string {
    return this.weatherCodeService.getWeatherCodeIcon(
      this.cityWeather.weather[0].weatherCode
    );
  }

  fetchCityWeather(selectedCity: City): void {
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

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
