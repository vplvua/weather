import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CitySelectService {
  selectedCity: Subject<string> = new Subject<string>();

  constructor() {}

  selectCity(city: string) {
    this.selectedCity.next(city);
  }
}
