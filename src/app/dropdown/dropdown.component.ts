import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { CitySelectService } from '../shared/services/city-select.service';
import { WeatherService } from '../shared/services/weather.service';
import { StorageService } from '../shared/services/storage.service';

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
    private weatherService: WeatherService,
    private storageService: StorageService
  ) {}

  ngOnInit() {
    this.http.get<any>('../../assets/locations.json').subscribe((data) => {
      this.cities = Object.keys(data);
      this.cityLocations = data;
    });
  }

  setSelectedCity(city: string) {
    const coordinates = this.cityLocations[city].location;
    const storedCityWeather = this.storageService.selectCityWeather(city);

    if (storedCityWeather && this.storageService.checkTimestamp(city)) {
      this.citySelectService.setSelectedCity(city, coordinates);
    } else {
      this.weatherService.getCityWeather(
        city,
        coordinates.lat,
        coordinates.lng
      );
    }
  }
}
