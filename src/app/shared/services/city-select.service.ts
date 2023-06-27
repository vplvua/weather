import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { City } from '../interfaces/city.interface';
import { Coordinates } from '../interfaces/city.interface';

@Injectable({
  providedIn: 'root',
})
export class CitySelectService {
  selectedCity$: BehaviorSubject<City> = new BehaviorSubject<City>({
    name: 'Kyiv',
    coordinates: {
      lat: 50.4501,
      lng: 30.5234,
    },
  });

  constructor() {}

  setSelectedCity(city: string, coordinates: Coordinates): void {
    const selectedCity: City = {
      name: city,
      coordinates: coordinates,
    };
    this.selectedCity$.next(selectedCity);
  }

  getSelectedCity(): Observable<City> {
    return this.selectedCity$.asObservable();
  }

  getSelectedCitySync(): City {
    return this.selectedCity$.value;
  }
}
