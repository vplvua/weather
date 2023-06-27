import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
} from '@angular/common/http';
import { BehaviorSubject, Observable, catchError, throwError } from 'rxjs';

import { environment } from 'src/environment';
import { CityWeather } from '../interfaces/city-weather.interface';
import { StorageService } from './storage.service';
import { WeatherCodeService } from './weather-code.service';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  url: string = environment.tomorrowUrl;
  token: string = environment.tomorrowToken;
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
      timestamp: 0,
      weather: [
        {
          humidity: 0,
          precipitationProbability: 0,
          temperature: 0,
          weatherCode: 0,
          windSpeed: 0,
          nameIconFile: 'sunny',
          weatherDescription: '',
        },
      ],
    }
  );

  constructor(
    private http: HttpClient,
    private storageService: StorageService,
    private weatherCodeService: WeatherCodeService
  ) {}

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
          return throwError(
            () => new Error('Помилка при отриманні даних з сервера')
          );
        })
      )
      .subscribe((response) => {
        const currenDate = new Date(
          response.data.timelines[0].intervals[0].startTime
        );
        const timestamp = currenDate.getTime() / 1000;

        const cityWeather: CityWeather = {
          city: city,
          timestamp: timestamp,
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
              nameIconFile: this.weatherCodeService.getWeatherCodeIcon(
                interval.values.weatherCode
              ),
              weatherDescription:
                this.weatherCodeService.getWeatherCodeDescription(
                  interval.values.weatherCode
                ),
            })
          ),
        };

        this.cityWeather$.next(cityWeather);
        this.storageService.addCityWeather(cityWeather);
      });
  }

  getCityWeather$(): Observable<CityWeather> {
    return this.cityWeather$.asObservable();
  }

  updateCityWeather(city: string): void {
    const existingCityWeather = this.storageService.selectCityWeather(city);

    if (existingCityWeather) {
      this.cityWeather$.next(existingCityWeather);
    }
  }
}
