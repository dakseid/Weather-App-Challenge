import { Card } from './ui/card';
import { getWeatherIcon } from './weather-icons';

interface DailyForecastData {
  date: string;
  weatherCode: number;
  maxTemperature: number;
  minTemperature: number;
}

interface DailyForecastProps {
  forecast: DailyForecastData[];
  units: {
    temperature: string;
  };
}

export function DailyForecast({ forecast, units }: DailyForecastProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1);

    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === tomorrow.toDateString()) {
      return 'Tomorrow';
    } else {
      return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
    }
  };

  return (
    <Card className="p-6">
      <h3 className="text-lg font-medium mb-4">7-Day Forecast</h3>
      <div className="space-y-3">
        {forecast.slice(0, 7).map((day, index) => (
          <div key={index} className="flex items-center justify-between py-2">
            <div className="flex items-center gap-3 flex-1">
              <span className="text-sm font-medium min-w-[80px]">
                {formatDate(day.date)}
              </span>
              <div className="flex items-center gap-2">
                {getWeatherIcon(day.weatherCode)}
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-sm text-muted-foreground">
                {Math.round(day.minTemperature)}°
              </span>
              <div className="w-16 h-2 bg-muted rounded-full overflow-hidden">
                <div 
                  className="h-full bg-primary rounded-full"
                  style={{ 
                    width: `${((day.maxTemperature - day.minTemperature) / 30) * 100}%`,
                    marginLeft: `${((day.minTemperature + 10) / 40) * 100}%`
                  }}
                />
              </div>
              <span className="text-sm font-medium">
                {Math.round(day.maxTemperature)}°{units.temperature}
              </span>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}