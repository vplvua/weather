import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { CitySelectService } from '../shared/city-select.service';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss'],
})
export class DropdownComponent {
  cities: string[] = [];

  constructor(
    private http: HttpClient,
    private citySelectService: CitySelectService
  ) {}

  ngOnInit() {
    this.http.get<any>('../../assets/locations.json').subscribe((data) => {
      this.cities = Object.keys(data);
    });
  }

  selectCity(city: string) {
    this.citySelectService.selectCity(city);
  }
}
