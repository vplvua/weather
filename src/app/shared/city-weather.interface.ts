export interface CityWeather {
  city: string;
  weather: {
    humidity: number;
    precipitationProbability: number;
    temperature: number;
    weatherCode: number;
    windSpeed: number;
  }[];
}
