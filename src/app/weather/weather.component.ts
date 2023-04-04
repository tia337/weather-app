import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { WeatherService } from '@core/api';
import { AutocompleteSuggestion, WeatherForecast } from '@core/models';
import { FavouritesService } from '@core/services';
import { Observable } from 'rxjs';

@Component({
  selector: 'wapp-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WeatherComponent {
  private readonly weatherService = inject(WeatherService);
  private readonly favouritesService = inject(FavouritesService);

  weatherData$: Observable<WeatherForecast>;

  loadWeatherData(suggestion: AutocompleteSuggestion | null): void {
    if (!suggestion) return;
    this.weatherData$ = this.weatherService.getForecast(suggestion.lat, suggestion.lon);
  }

  addToFavourites(weatherData: WeatherForecast): void {
   this.favouritesService.addToFavourites(weatherData);
  }

}
