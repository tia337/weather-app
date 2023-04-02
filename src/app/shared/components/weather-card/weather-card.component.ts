import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { City, WeatherDetail } from '@core/models';

@Component({
  selector: 'wapp-weather-card',
  templateUrl: './weather-card.component.html',
  styleUrls: ['./weather-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WeatherCardComponent {
  @Input() city: City;
  @Input() weatherDetail: WeatherDetail;
  @Input() showActionButtons = true;
  @Output() addedFavourite = new EventEmitter<boolean>();

  get weatherDescription(): string {
    return this.weatherDetail.weather.map(e => e.description).join(', ');
  }

  addFavourite(): void {
    this.addedFavourite.emit(true);
  }
}
