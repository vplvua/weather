import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss'],
})
export class DropdownComponent {
  cities: string[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get<any>('../../assets/locations.json').subscribe((data) => {
      this.cities = Object.keys(data);
    });
  }
}
