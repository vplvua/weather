import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'temperatureConversion',
})
export class TemperatureConversionPipe implements PipeTransform {
  transform(value: number, unitSystem: string): number {
    if (unitSystem === 'imperial') {
      return Math.round((value * 9) / 5 + 32);
    }
    return Math.round(value);
  }
}
