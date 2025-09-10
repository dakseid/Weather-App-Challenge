import { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { getWeatherIcon } from './weather-icons';

interface HourlyForecastData {
  time: string;
  temperature: number;
  weatherCode: number;
}

interface HourlyForecastProps {
  forecast: HourlyForecastData[];
  units: {
    temperature: string;
  };
}

export function HourlyForecast({ forecast, units }: HourlyForecastProps) {
  const [selectedDay, setSelectedDay] = useState(0);

  // Group hourly data by day
  const groupedByDay = forecast.reduce((acc: { [key: string]: HourlyForecastData[] }, hour) => {
    const date = hour.time.split('T')[0];
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(hour);
    return acc;
  }, {});

  const days = Object.keys(groupedByDay).slice(0, 7);
  const selectedDayData = groupedByDay[days[selectedDay]] || [];

  const formatTime = (timeString: string) => {
    const date = new Date(timeString);
    return date.toLocaleTimeString('en-US', { hour: 'numeric', hour12: true });
  };

  const formatDaySelector = (dateString: string, index: number) => {
    const date = new Date(dateString);
    const today = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1);

    if (index === 0) {
      return 'Today';
    } else if (index === 1) {
      return 'Tomorrow';
    } else {
      return date.toLocaleDateString('en-US', { weekday: 'short' });
    }
  };

  return (
    <Card className="p-6">
      <h3 className="text-lg font-medium mb-4">Hourly Forecast</h3>
      
      {/* Day selector */}
      <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
        {days.map((day, index) => (
          <Button
            key={index}
            variant={selectedDay === index ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedDay(index)}
            className="whitespace-nowrap"
          >
            {formatDaySelector(day, index)}
          </Button>
        ))}
      </div>

      {/* Hourly data */}
      <div className="overflow-x-auto">
        <div className="flex gap-4 pb-2">
          {selectedDayData.map((hour, index) => (
            <div key={index} className="flex flex-col items-center gap-2 min-w-[60px]">
              <span className="text-xs text-muted-foreground">
                {formatTime(hour.time)}
              </span>
              {getWeatherIcon(hour.weatherCode)}
              <span className="text-sm font-medium">
                {Math.round(hour.temperature)}°{units.temperature}
              </span>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}