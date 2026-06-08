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
    weather: WeatherDescription[]
}

export interface WeatherApiResponse {
  lat: number;
  lon: number;
  timezone: string;
  timezone_offset: number;
  data: CurrentConditions[];
}