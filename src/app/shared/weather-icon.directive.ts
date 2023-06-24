import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[appWeatherIcon]',
})
export class WeatherIconDirective {
  @Input() weatherIcon: string = 'sunny';

  constructor(private elementRef: ElementRef) {}

  ngOnChanges() {
    const imagePath = `/assets/images/${this.weatherIcon}.svg`;
    this.elementRef.nativeElement.src = imagePath;
  }
}
