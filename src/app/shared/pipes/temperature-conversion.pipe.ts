import { Pipe, PipeTransform } from '@angular/core';

import { UnitSystem } from '../unit-system.enum';

@Pipe({
  name: 'temperatureConversion',
})
export class TemperatureConversionPipe implements PipeTransform {
  transform(value: number, unitSystem: UnitSystem): number {
    if (unitSystem === 'imperial') {
      return Math.round((value * 9) / 5 + 32);
    }
    return Math.round(value);
  }
}
