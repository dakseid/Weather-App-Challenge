import {
  Sun,
  Cloud,
  CloudRain,
  CloudSnow,
  CloudDrizzle,
  Zap,
  Eye,
  CloudFog,
} from 'lucide-react';

export function getWeatherIcon(weatherCode: number, isDay: boolean = true) {
  const iconProps = { className: "h-6 w-6" };
  
  switch (weatherCode) {
    case 0: // Clear sky
      return isDay ? <Sun {...iconProps} /> : <Sun {...iconProps} className="h-6 w-6 opacity-60" />;
    case 1: // Mainly clear
    case 2: // Partly cloudy
    case 3: // Overcast
      return <Cloud {...iconProps} />;
    case 45: // Fog
    case 48: // Depositing rime fog
      return <CloudFog {...iconProps} />;
    case 51: // Light drizzle
    case 53: // Moderate drizzle
    case 55: // Dense drizzle
    case 56: // Light freezing drizzle
    case 57: // Dense freezing drizzle
      return <CloudDrizzle {...iconProps} />;
    case 61: // Slight rain
    case 63: // Moderate rain
    case 65: // Heavy rain
    case 66: // Light freezing rain
    case 67: // Heavy freezing rain
    case 80: // Slight rain showers
    case 81: // Moderate rain showers
    case 82: // Violent rain showers
      return <CloudRain {...iconProps} />;
    case 71: // Slight snow fall
    case 73: // Moderate snow fall
    case 75: // Heavy snow fall
    case 77: // Snow grains
    case 85: // Slight snow showers
    case 86: // Heavy snow showers
      return <CloudSnow {...iconProps} />;
    case 95: // Thunderstorm
    case 96: // Thunderstorm with slight hail
    case 99: // Thunderstorm with heavy hail
      return <Zap {...iconProps} />;
    default:
      return <Sun {...iconProps} />;
  }
}

export function getLargeWeatherIcon(weatherCode: number, isDay: boolean = true) {
  const iconProps = { className: "h-16 w-16" };
  
  switch (weatherCode) {
    case 0: // Clear sky
      return isDay ? <Sun {...iconProps} /> : <Sun {...iconProps} className="h-16 w-16 opacity-60" />;
    case 1: // Mainly clear
    case 2: // Partly cloudy
    case 3: // Overcast
      return <Cloud {...iconProps} />;
    case 45: // Fog
    case 48: // Depositing rime fog
      return <CloudFog {...iconProps} />;
    case 51: // Light drizzle
    case 53: // Moderate drizzle
    case 55: // Dense drizzle
    case 56: // Light freezing drizzle
    case 57: // Dense freezing drizzle
      return <CloudDrizzle {...iconProps} />;
    case 61: // Slight rain
    case 63: // Moderate rain
    case 65: // Heavy rain
    case 66: // Light freezing rain
    case 67: // Heavy freezing rain
    case 80: // Slight rain showers
    case 81: // Moderate rain showers
    case 82: // Violent rain showers
      return <CloudRain {...iconProps} />;
    case 71: // Slight snow fall
    case 73: // Moderate snow fall
    case 75: // Heavy snow fall
    case 77: // Snow grains
    case 85: // Slight snow showers
    case 86: // Heavy snow showers
      return <CloudSnow {...iconProps} />;
    case 95: // Thunderstorm
    case 96: // Thunderstorm with slight hail
    case 99: // Thunderstorm with heavy hail
      return <Zap {...iconProps} />;
    default:
      return <Sun {...iconProps} />;
  }
}

export function getWeatherDescription(weatherCode: number): string {
  switch (weatherCode) {
    case 0: return 'Clear sky';
    case 1: return 'Mainly clear';
    case 2: return 'Partly cloudy';
    case 3: return 'Overcast';
    case 45: return 'Fog';
    case 48: return 'Depositing rime fog';
    case 51: return 'Light drizzle';
    case 53: return 'Moderate drizzle';
    case 55: return 'Dense drizzle';
    case 56: return 'Light freezing drizzle';
    case 57: return 'Dense freezing drizzle';
    case 61: return 'Slight rain';
    case 63: return 'Moderate rain';
    case 65: return 'Heavy rain';
    case 66: return 'Light freezing rain';
    case 67: return 'Heavy freezing rain';
    case 71: return 'Slight snow fall';
    case 73: return 'Moderate snow fall';
    case 75: return 'Heavy snow fall';
    case 77: return 'Snow grains';
    case 80: return 'Slight rain showers';
    case 81: return 'Moderate rain showers';
    case 82: return 'Violent rain showers';
    case 85: return 'Slight snow showers';
    case 86: return 'Heavy snow showers';
    case 95: return 'Thunderstorm';
    case 96: return 'Thunderstorm with slight hail';
    case 99: return 'Thunderstorm with heavy hail';
    default: return 'Unknown';
  }
}