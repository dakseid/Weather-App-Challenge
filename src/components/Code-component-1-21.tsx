import { MapPin, Thermometer, Droplets, Wind, Gauge } from 'lucide-react';
import { Card } from './ui/card';
import { getLargeWeatherIcon, getWeatherDescription } from './weather-icons';

interface CurrentWeatherData {
  temperature: number;
  apparentTemperature: number;
  humidity: number;
  windSpeed: number;
  precipitation: number;
  weatherCode: number;
  isDay: boolean;
}

interface CurrentWeatherProps {
  location: {
    name: string;
    country: string;
  };
  weatherData: CurrentWeatherData;
  units: {
    temperature: string;
    windSpeed: string;
    precipitation: string;
  };
}

export function CurrentWeather({ location, weatherData, units }: CurrentWeatherProps) {
  const {
    temperature,
    apparentTemperature,
    humidity,
    windSpeed,
    precipitation,
    weatherCode,
    isDay,
  } = weatherData;

  return (
    <Card className="p-6">
      <div className="flex items-start justify-between mb-6">
        <div>
          <div className="flex items-center gap-2 text-muted-foreground mb-2">
            <MapPin className="h-4 w-4" />
            <span>{location.name}, {location.country}</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-5xl font-medium">
              {Math.round(temperature)}°{units.temperature}
            </div>
            <div className="flex flex-col items-center">
              {getLargeWeatherIcon(weatherCode, isDay)}
              <span className="text-sm text-muted-foreground mt-1">
                {getWeatherDescription(weatherCode)}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
          <Thermometer className="h-5 w-5 text-muted-foreground" />
          <div>
            <p className="text-sm text-muted-foreground">Feels like</p>
            <p className="font-medium">{Math.round(apparentTemperature)}°{units.temperature}</p>
          </div>
        </div>

        <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
          <Droplets className="h-5 w-5 text-muted-foreground" />
          <div>
            <p className="text-sm text-muted-foreground">Humidity</p>
            <p className="font-medium">{Math.round(humidity)}%</p>
          </div>
        </div>

        <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
          <Wind className="h-5 w-5 text-muted-foreground" />
          <div>
            <p className="text-sm text-muted-foreground">Wind Speed</p>
            <p className="font-medium">{Math.round(windSpeed)} {units.windSpeed}</p>
          </div>
        </div>

        <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
          <Gauge className="h-5 w-5 text-muted-foreground" />
          <div>
            <p className="text-sm text-muted-foreground">Precipitation</p>
            <p className="font-medium">{precipitation.toFixed(1)} {units.precipitation}</p>
          </div>
        </div>
      </div>
    </Card>
  );
}