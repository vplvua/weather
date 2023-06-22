import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[appWeatherIcon]',
})
export class WeatherIconDirective implements OnInit {
  @Input() weatherIcon: string = '';

  constructor(private elementRef: ElementRef) {}

  ngOnInit(): void {
    const imagePath = `../../assets/images/${this.weatherIcon}.svg`;
    this.elementRef.nativeElement.src = imagePath;
  }
}
