import { useState } from 'react';
import { Search } from 'lucide-react';
import { Input } from './ui/input';
import { Button } from './ui/button';

interface Location {
  name: string;
  country: string;
  latitude: number;
  longitude: number;
}

interface WeatherSearchProps {
  onLocationSelect: (location: Location) => void;
}

export function WeatherSearch({ onLocationSelect }: WeatherSearchProps) {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<Location[]>([]);
  const [loading, setLoading] = useState(false);

  const searchLocations = async (searchQuery: string) => {
    if (searchQuery.length < 2) {
      setSuggestions([]);
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(searchQuery)}&count=5&language=en&format=json`
      );
      const data = await response.json();
      
      if (data.results) {
        const locations = data.results.map((result: any) => ({
          name: result.name,
          country: result.country,
          latitude: result.latitude,
          longitude: result.longitude,
        }));
        setSuggestions(locations);
      } else {
        setSuggestions([]);
      }
    } catch (error) {
      console.error('Error searching locations:', error);
      setSuggestions([]);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    searchLocations(value);
  };

  const handleLocationSelect = (location: Location) => {
    setQuery(`${location.name}, ${location.country}`);
    setSuggestions([]);
    onLocationSelect(location);
  };

  return (
    <div className="relative w-full max-w-md">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search for a location..."
          value={query}
          onChange={handleInputChange}
          className="pl-10 bg-input-background"
        />
      </div>
      
      {suggestions.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-card border border-border rounded-lg shadow-lg z-10">
          {suggestions.map((location, index) => (
            <button
              key={index}
              onClick={() => handleLocationSelect(location)}
              className="w-full text-left px-4 py-2 hover:bg-accent first:rounded-t-lg last:rounded-b-lg transition-colors"
            >
              <div>
                <span className="font-medium">{location.name}</span>
                <span className="text-muted-foreground ml-2">{location.country}</span>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}