import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WeatherCodeService {
  private weatherCodes: { [code: number]: string } = {};

  constructor(private http: HttpClient) {
    this.loadWeatherCodes();
  }

  private loadWeatherCodes() {
    this.http.get<any>('assets/weather-codes.json').subscribe((response) => {
      this.weatherCodes = response;
    });
  }

  getWeatherCodeDescription(code: number): string {
    return this.weatherCodes[code] || '';
  }

  getWeatherCodes(): Observable<{ [code: string]: string }> {
    return this.http.get<{ [code: string]: string }>(
      'assets/weather-codes.json'
    );
  }
}
