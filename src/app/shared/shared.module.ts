import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';

import { AutocompleteComponent } from './components/autocomplete/autocomplete.component';
import { WeatherCardComponent } from './components/weather-card/weather-card.component';
import { NavbarComponent } from './components/navbar/navbar.component';


const COMPONENTS = [AutocompleteComponent, WeatherCardComponent, NavbarComponent];
const MATERIAL_IMPORTS = [
  MatCardModule,
  MatButtonModule,
  MatIconModule,
  MatAutocompleteModule,
  MatInputModule,
  MatToolbarModule
];

@NgModule({
  declarations: [...COMPONENTS],
  imports: [CommonModule, RouterModule, ReactiveFormsModule, ...MATERIAL_IMPORTS],
  exports: [...COMPONENTS]
})
export class SharedModule { }
