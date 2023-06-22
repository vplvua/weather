import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { CitySelectService } from '../shared/city-select.service';
import { WeatherService } from '../shared/weather.service';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss'],
})
export class DropdownComponent {
  cities: string[] = [];
  cityLocations: any;

  constructor(
    private http: HttpClient,
    private citySelectService: CitySelectService,
    private weatherService: WeatherService
  ) {}

  ngOnInit() {
    this.http.get<any>('../../assets/locations.json').subscribe((data) => {
      this.cities = Object.keys(data);
      this.cityLocations = data;
    });
  }

  setSelectedCity(city: string) {
    const coordinates = this.cityLocations[city].location;
    this.citySelectService.setSelectedCity(city, coordinates);
    this.weatherService.getCityWeather(city, coordinates.lat, coordinates.lng);
  }
}
