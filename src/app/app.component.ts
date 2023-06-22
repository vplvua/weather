import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

import { UnitSystem } from './shared/unit-system.enum';
import { WheatherIconDirective } from './shared/wheather-icon.directive';
import { WheatherService } from './shared/wheather.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  unitSystem = UnitSystem.Metric;
  toggleUnitSystem = new FormControl(false);

  constructor(private wheatherService: WheatherService) {
    this.toggleUnitSystem.valueChanges.subscribe((value) => {
      if (value) {
        this.unitSystem = UnitSystem.Imperial;
      } else {
        this.unitSystem = UnitSystem.Metric;
      }
    });
  }

  ngOnInit() {
    this.wheatherService.getWheather().subscribe((response) => {
      console.log(response);
    });
  }
}
