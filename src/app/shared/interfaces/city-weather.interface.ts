export interface WeatherData {
  humidity: number;
  precipitationProbability: number;
  temperature: number;
  weatherCode: number;
  windSpeed: number;
  nameIconFile: string;
  weatherDescription: string;
}

export interface CityWeather {
  city: string;
  timestamp: number;
  weather: WeatherData[];
}
