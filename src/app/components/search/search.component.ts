import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

@Component({
  selector: 'app-search',
  imports: [MatAutocompleteModule, ReactiveFormsModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
})
export class SearchComponent {
  public options = [1, 2, 3, 4, 5];
  public search = new FormControl('');
}
