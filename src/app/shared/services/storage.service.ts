import { Injectable } from '@angular/core';
import { Subject, Subscription } from 'rxjs';

import { CityWeather } from '../interfaces/city-weather.interface';
import { CitySelectService } from './city-select.service';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  weatherData$: Subject<CityWeather[]> = new Subject<CityWeather[]>();
  private _weatherData: CityWeather[] = [];

  subscription = new Subscription();

  constructor(private citySelectService: CitySelectService) {
    this.fetchWeatherData();
  }

  get weatherDataValue(): CityWeather[] {
    return this._weatherData;
  }

  set weatherDataValue(weather: CityWeather[]) {
    this._weatherData = weather;
    this.weatherData$.next(this._weatherData);
  }

  clearWeatherData(): void {
    this._weatherData = [];
    this.weatherData$.next(this._weatherData);
    this.storeWeatherData();
  }

  storeWeatherData(): void {
    localStorage.setItem('weatherData', JSON.stringify(this._weatherData));
  }

  fetchWeatherData(): void {
    const weatherData = JSON.parse(localStorage.getItem('weatherData') || '[]');
    if (weatherData) {
      this._weatherData = weatherData;
      this.weatherData$.next(this._weatherData);
    }
  }

  selectCityWeather(city: string): CityWeather | undefined {
    return this._weatherData.find((weatherData) => weatherData.city === city);
  }

  addCityWeather(cityWeather: CityWeather): void {
    const checkTimestamp = this.checkTimestamp(cityWeather.city);

    if (!checkTimestamp) {
      this.updateCityWeather(cityWeather);
    }

    this._weatherData.push(cityWeather);
    this.weatherData$.next(this._weatherData);
    this.storeWeatherData();
  }

  updateCityWeather(cityWeather: CityWeather): void {
    const index = this._weatherData.findIndex(
      (cityWeatherData) => cityWeatherData.city === cityWeather.city
    );

    this._weatherData[index] = cityWeather;
    this.weatherData$.next(this._weatherData);
    this.storeWeatherData();
  }

  checkTimestamp(city: string): boolean {
    const existingCityWeather = this.selectCityWeather(city);

    if (existingCityWeather) {
      const timestamp = existingCityWeather.timestamp;
      const currentTimestamp = Math.floor(Date.now() / 1000);
      if (currentTimestamp - timestamp < 3600) {
        return true;
      }
    }

    return false;
  }
}
