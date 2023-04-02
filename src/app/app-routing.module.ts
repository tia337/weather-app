import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FavouritesComponent } from './favourites/favourites.component';
import { WeatherComponent } from './weather/weather.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'weather'
  },
  {
    path: 'weather',
    component: WeatherComponent
  },
  {
    path: 'favourites',
    component: FavouritesComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
