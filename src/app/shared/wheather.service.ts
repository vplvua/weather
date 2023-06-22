import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { environment } from '../../environment';

@Injectable({
  providedIn: 'root',
})
export class WheatherService {
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

  constructor(private http: HttpClient) {}

  getWheather() {
    const params = new HttpParams()
      .set('location', this.location.join(','))
      .set('fields', this.fields.join(','))
      .set('units', this.units)
      .set('timezone', this.timezone)
      .set('timestamp', this.timestamp)
      .set('apikey', this.token);

    return this.http.get<any>(this.url, { params });
  }
}
