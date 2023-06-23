export interface WeatherData {
  humidity: number;
  precipitationProbability: number;
  temperature: number;
  weatherCode: number;
  windSpeed: number;
}

export interface CityWeather {
  city: string;
  timestamp: number;
  weather: WeatherData[];
}
