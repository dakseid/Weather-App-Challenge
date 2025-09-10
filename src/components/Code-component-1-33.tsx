import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';

export type UnitSystem = 'metric' | 'imperial';

interface Units {
  temperature: string;
  windSpeed: string;
  precipitation: string;
}

interface UnitSelectorProps {
  units: UnitSystem;
  onUnitsChange: (units: UnitSystem) => void;
}

export function UnitSelector({ units, onUnitsChange }: UnitSelectorProps) {
  return (
    <Select value={units} onValueChange={(value: UnitSystem) => onUnitsChange(value)}>
      <SelectTrigger className="w-[140px]">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="metric">Metric</SelectItem>
        <SelectItem value="imperial">Imperial</SelectItem>
      </SelectContent>
    </Select>
  );
}

export function getUnits(system: UnitSystem): Units {
  if (system === 'imperial') {
    return {
      temperature: 'F',
      windSpeed: 'mph',
      precipitation: 'in',
    };
  }
  
  return {
    temperature: 'C',
    windSpeed: 'km/h',
    precipitation: 'mm',
  };
}