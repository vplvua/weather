import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { environment } from '../../environment';
import { Subject } from 'rxjs';
import { CityWeather } from './city-weather.interface';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  url: string = environment.tomorrowURL;
  token: string = environment.tomorrowToken;
  location = [50.4501, 30.5234];
  fields = [
    'precipitationProbability',
    'windSpeed',
    'temperature',
    'humidity',
    'weatherCode',
  ];
  units = 'metric';
  timezone = 'Europe/Kiev';
  timestamp = '1h';
  weather$: Subject<CityWeather[]> = new Subject<CityWeather[]>();
  selectedCity = 'Lviv';

  constructor(private http: HttpClient) {}

  getWeather() {
    const params = new HttpParams()
      .set('location', this.location.join(','))
      .set('fields', this.fields.join(','))
      .set('units', this.units)
      .set('timezone', this.timezone)
      .set('timestamp', this.timestamp)
      .set('apikey', this.token);

    this.http.get<any>(this.url, { params }).subscribe((response) => {
      const cityWeather: CityWeather = {
        city: this.selectedCity,
        weather: response.data.timelines[0].intervals.slice(0, 5).map(
          (interval: {
            values: {
              humidity: any;
              precipitationProbability: any;
              temperature: any;
              weatherCode: any;
              windSpeed: any;
            };
          }) => ({
            humidity: interval.values.humidity,
            precipitationProbability: interval.values.precipitationProbability,
            temperature: interval.values.temperature,
            weatherCode: interval.values.weatherCode,
            windSpeed: interval.values.windSpeed,
          })
        ),
      };

      this.weather$.next([cityWeather]);
    });

    return this.weather$.asObservable();
  }

  updateWeather(data: CityWeather[]) {
    this.weather$.next(data);
  }
}
