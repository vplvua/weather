import { Pipe, PipeTransform } from '@angular/core';

import { UnitSystem } from './unit-system.enum';

@Pipe({
  name: 'speedConversion',
})
export class SpeedConversionPipe implements PipeTransform {
  transform(value: number, unitSystem: UnitSystem): number {
    if (unitSystem === 'imperial') {
      return Math.round(value * 0.621371);
    }
    return Math.round(value);
  }
}
