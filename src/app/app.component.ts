import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';

import { UnitSystem } from './shared/unit-system.enum';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  unitSystem = UnitSystem.Metric;
  toggleUnitSystem = new FormControl(false);

  constructor() {
    this.toggleUnitSystem.valueChanges.subscribe((value) => {
      if (value) {
        this.unitSystem = UnitSystem.Imperial;
      } else {
        this.unitSystem = UnitSystem.Metric;
      }
    });
  }
}
