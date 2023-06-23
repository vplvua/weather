import { Pipe, PipeTransform } from '@angular/core';

import { UnitSystem } from '../unit-system.enum';

@Pipe({
  name: 'speedUnit',
})
export class SpeedUnitPipe implements PipeTransform {
  transform(value: number, unitSystem: UnitSystem): string {
    return `${value} ${unitSystem === UnitSystem.Metric ? 'km/h' : 'mph'}`;
  }
}
