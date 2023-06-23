import { Pipe, PipeTransform } from '@angular/core';

import { UnitSystem } from '../unit-system.enum';

@Pipe({
  name: 'temperatureUnit',
})
export class TemperatureUnitPipe implements PipeTransform {
  transform(value: number, unitSystem: UnitSystem): string {
    return `${value}${unitSystem === UnitSystem.Metric ? '°C' : '°F'}`;
  }
}
