import { ChangeDetectionStrategy, Component, EventEmitter, inject, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { WeatherService } from '@core/api';
import { AutocompleteSuggestion } from '@core/models';
import { debounceTime, distinctUntilChanged, Observable, of, startWith, switchMap } from 'rxjs';

@Component({
  selector: 'wapp-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AutocompleteComponent {
  @Output() optionSelected = new EventEmitter<AutocompleteSuggestion | null>();
  private readonly weatherService = inject(WeatherService);

  autocomplete = new FormControl<AutocompleteSuggestion | null>(null);
  filteredOptions$: Observable<AutocompleteSuggestion[] | null> = this.autocomplete.valueChanges
    .pipe(
      startWith(''),
      debounceTime(500),
      distinctUntilChanged(),
      switchMap(value => value ? this.weatherService.autocomplete(this.getQuery(value)) : of(null)),
    );

  displayFn(s: AutocompleteSuggestion): string {
    return s?.name;
  }

  selected(): void {
    console.log(this.autocomplete.value)
    this.optionSelected.emit(this.autocomplete.value);
  }

  private getQuery(value: string | AutocompleteSuggestion | null): string {
    if (!value) return '';
    if (typeof value === 'string') return value;

    return value.name;
  }
}
