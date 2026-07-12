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
  dt: number;
  sunrise: number;
  sunset: number;
  temp: number;
  feels_like: number;
  pressure: number;
  humidity: number;
  dew_point: number;
  uvi: number;
  clouds: number;
  visibility: number;
  wind_speed: number;
  wind_deg: number;
  weather: WeatherDescription[];
  alerts: string[];
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
  city: ForecastCity;
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

export interface ForecastCity {
  timezone: number;
}

export interface AirPollutionResponse {
  coord: [number, number];
  list: AirPollutionData[];
}

export interface AirPollutionData {
  dt: number;
  main: AirQualityIndex;
  components: AirPollutionComponents;
}

export interface AirQualityIndex {
  aqi: 1 | 2 | 3 | 4 | 5;
}

export interface AirPollutionComponents {
  co: number;
  no: number;
  no2: number;
  o3: number;
  so2: number;
  pm2_5: number;
  pm10: number;
  nh3: number;
}
