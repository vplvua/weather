import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
} from '@angular/common/http';

import { environment } from '../../environment';
import {
  BehaviorSubject,
  Observable,
  Subject,
  catchError,
  throwError,
} from 'rxjs';
import { CityWeather } from './city-weather.interface';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  url: string = environment.tomorrowUrl;
  token: string = environment.tomorrowToken;
  // location = [50.4501, 30.5234];
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
  cityWeather$: BehaviorSubject<CityWeather> = new BehaviorSubject<CityWeather>(
    {
      city: 'Kyiv',
      weather: [],
    }
  );

  constructor(private http: HttpClient) {}

  getCityWeather(city: string, lat: number, lng: number) {
    const params = new HttpParams()
      .set('location', `${lat},${lng}`)
      .set('fields', this.fields.join(','))
      .set('units', this.units)
      .set('timezone', this.timezone)
      .set('timestamp', this.timestamp)
      .set('apikey', this.token);

    this.http
      .get<any>(this.url, { params })
      .pipe(
        catchError((error: HttpErrorResponse) => {
          console.log('HTTP Error:', error);
          return throwError('Помилка при отриманні даних з сервера');
        })
      )
      .subscribe((response) => {
        const cityWeather: CityWeather = {
          city: city,
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
              precipitationProbability:
                interval.values.precipitationProbability,
              temperature: interval.values.temperature,
              weatherCode: interval.values.weatherCode,
              windSpeed: interval.values.windSpeed,
            })
          ),
        };

        this.cityWeather$.next(cityWeather);
      });
  }

  getCityWeather$(): Observable<CityWeather> {
    return this.cityWeather$.asObservable();
  }
}
