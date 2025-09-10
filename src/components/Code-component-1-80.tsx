import { useState, useEffect } from 'react';
import { WeatherSearch } from './weather-search';
import { CurrentWeather } from './current-weather';
import { DailyForecast } from './daily-forecast';
import { HourlyForecast } from './hourly-forecast';
import { UnitSelector, getUnits, type UnitSystem } from './unit-selector';
import { Skeleton } from './ui/skeleton';
import { Alert, AlertDescription } from './ui/alert';
import { AlertCircle } from 'lucide-react';

interface Location {
  name: string;
  country: string;
  latitude: number;
  longitude: number;
}

interface WeatherData {
  current: {
    temperature: number;
    apparentTemperature: number;
    humidity: number;
    windSpeed: number;
    precipitation: number;
    weatherCode: number;
    isDay: boolean;
  };
  daily: Array<{
    date: string;
    weatherCode: number;
    maxTemperature: number;
    minTemperature: number;
  }>;
  hourly: Array<{
    time: string;
    temperature: number;
    weatherCode: number;
  }>;
}

interface WeatherAppProps {
  onError?: (error: string) => void;
}

export function WeatherApp({ onError }: WeatherAppProps) {
  const [location, setLocation] = useState<Location | null>(null);
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [units, setUnits] = useState<UnitSystem>('metric');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchWeatherData = async (lat: number, lon: number, unitSystem: UnitSystem) => {
    setLoading(true);
    setError(null);
    
    try {
      const tempUnit = unitSystem === 'imperial' ? 'fahrenheit' : 'celsius';
      const windSpeedUnit = unitSystem === 'imperial' ? 'mph' : 'kmh';
      const precipitationUnit = unitSystem === 'imperial' ? 'inch' : 'mm';
      
      const response = await fetch(
        `https://api.open-meteo.com/v1/forecast?` +
        `latitude=${lat}&longitude=${lon}&` +
        `current=temperature_2m,apparent_temperature,relative_humidity_2m,wind_speed_10m,precipitation,weather_code,is_day&` +
        `daily=weather_code,temperature_2m_max,temperature_2m_min&` +
        `hourly=temperature_2m,weather_code&` +
        `temperature_unit=${tempUnit}&` +
        `wind_speed_unit=${windSpeedUnit}&` +
        `precipitation_unit=${precipitationUnit}&` +
        `timezone=auto&` +
        `forecast_days=7`
      );

      if (!response.ok) {
        if (response.status >= 500) {
          // Server error - navigate to error page
          onError?.('Server is temporarily unavailable. Please try again later.');
          return;
        }
        throw new Error('Failed to fetch weather data');
      }

      const data = await response.json();
      
      const weatherData: WeatherData = {
        current: {
          temperature: data.current.temperature_2m,
          apparentTemperature: data.current.apparent_temperature,
          humidity: data.current.relative_humidity_2m,
          windSpeed: data.current.wind_speed_10m,
          precipitation: data.current.precipitation,
          weatherCode: data.current.weather_code,
          isDay: data.current.is_day === 1,
        },
        daily: data.daily.time.map((date: string, index: number) => ({
          date,
          weatherCode: data.daily.weather_code[index],
          maxTemperature: data.daily.temperature_2m_max[index],
          minTemperature: data.daily.temperature_2m_min[index],
        })),
        hourly: data.hourly.time.slice(0, 168).map((time: string, index: number) => ({
          time,
          temperature: data.hourly.temperature_2m[index],
          weatherCode: data.hourly.weather_code[index],
        })),
      };

      setWeatherData(weatherData);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred';
      
      // For network errors or critical failures, navigate to error page
      if (err instanceof TypeError && err.message.includes('fetch')) {
        onError?.('Network connection failed. Please check your internet connection.');
      } else {
        setError(errorMessage);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleLocationSelect = (newLocation: Location) => {
    setLocation(newLocation);
  };

  const handleUnitsChange = (newUnits: UnitSystem) => {
    setUnits(newUnits);
  };

  useEffect(() => {
    if (location) {
      fetchWeatherData(location.latitude, location.longitude, units);
    }
  }, [location, units]);

  // Load default location (London) on first visit
  useEffect(() => {
    if (!location) {
      setLocation({
        name: 'London',
        country: 'United Kingdom',
        latitude: 51.5074,
        longitude: -0.1278,
      });
    }
  }, []);

  const unitLabels = getUnits(units);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Weather App</h1>
            <p className="text-muted-foreground">
              Get current weather conditions and forecasts for any location
            </p>
          </div>
          <div className="flex items-center gap-4">
            <WeatherSearch onLocationSelect={handleLocationSelect} />
            <UnitSelector units={units} onUnitsChange={handleUnitsChange} />
          </div>
        </div>

        {error && (
          <Alert className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {loading ? (
          <div className="space-y-6">
            <Skeleton className="h-48 w-full" />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Skeleton className="h-96 w-full" />
              <Skeleton className="h-96 w-full" />
            </div>
          </div>
        ) : weatherData && location ? (
          <div className="space-y-6">
            {/* Current Weather */}
            <CurrentWeather
              location={location}
              weatherData={weatherData.current}
              units={unitLabels}
            />

            {/* Forecasts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <DailyForecast
                forecast={weatherData.daily}
                units={unitLabels}
              />
              <HourlyForecast
                forecast={weatherData.hourly}
                units={unitLabels}
              />
            </div>
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Search for a location to view weather data</p>
          </div>
        )}
      </div>
    </div>
  );
}