import { Injectable } from '@angular/core';
import { WeatherForecast } from '@core/models';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FavouritesService {

  addToFavourites(weatherData: WeatherForecast): void {
    if (!this.isFavourite(weatherData.city.name)) {
      localStorage.setItem(weatherData.city.name, JSON.stringify(weatherData));
    } else {
      localStorage.removeItem(weatherData.city.name);
    }
  }

  getFavourites$(): Observable<WeatherForecast[] | null> {
    let items = [];
    for (let [key, value] of Object.entries(localStorage)) {
      items.push(JSON.parse(value))
    }

    return items.length ? of(items) : of(null);
  }

  private isFavourite(cityName: string): boolean {
    return !!localStorage.getItem(cityName);
  }
}
