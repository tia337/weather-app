import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AutocompleteSuggestion, WeatherForecast } from '@core/models';
import { environment } from '@environment';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private readonly apiUrl = environment.apiUrl;

  private readonly http = inject(HttpClient);

  autocomplete(cityName: string, limit = 5): Observable<AutocompleteSuggestion[]> {
    return this.http.get<AutocompleteSuggestion[]>(`${this.apiUrl}/geo/1.0/direct?q=${cityName}&limit=${limit}`);
  }

  getForecast(lat: number, lon: number, daysCount = 6): Observable<WeatherForecast>{
    return this.http.get<WeatherForecast>(`${this.apiUrl}/data/2.5/forecast/daily?lat=${lat}&lon=${lon}&cnt=${daysCount}`);
  }
}
