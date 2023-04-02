import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FavouritesService } from '@core/services';

@Component({
  selector: 'wapp-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FavouritesComponent {

  favourites$ = inject(FavouritesService).getFavourites$();
}
