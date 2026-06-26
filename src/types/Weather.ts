export interface CityWeatherData {
    city: string; 
    country: string;
    state: string;
    weather: WeatherApiResponse;
}

export interface WeatherDescription {
    id: number; 
    main: string; 
    description: string;
    icon: string;
}

export interface CurrentConditions {
  temp: number;
  feels_like: number;
  pressure: number;
  humidity: number;
  wind_speed: number;
  wind_deg: number;
  sunrise: number;
  sunset: number;
  visibility: number;
  clouds: number;
  uvi: number;
  dew_point: number;
  weather: WeatherDescription[];
}

export interface WeatherApiResponse {
  lat: number;
  lon: number;
  timezone: string;
  timezone_offset: number;
  data: CurrentConditions[];
}

export interface FiveDayForecastResponse {
  cod: string;
  message: number;
  cnt: number;
  list: ForecastWeatherResponse[];
}

export interface ForecastWeatherResponse {
  dt: number;
  main: ForecastMain;
  weather: WeatherDescription[];
  clouds: ForecastClouds;
  wind: ForecastWind;
  visibility: number;
  pop: number;
  rain?: ForecastRain;
  dt_txt: string;
}

export interface ForecastMain {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  sea_level: number;
  grnd_level: number;
  humidity: number;
  temp_kf: number;
}

export interface ForecastClouds {
  all: number;
}

export interface ForecastWind {
  speed: number;
  deg: number;
  gust: number;
}

export interface ForecastRain {
  "3h": number;
} 
