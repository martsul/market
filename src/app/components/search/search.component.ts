import { Component, HostListener, signal } from '@angular/core';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

@Component({
  selector: 'app-search',
  imports: [MatAutocompleteModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
})
export class SearchComponent {
  public searchIsOpen = signal<boolean>(false);
  public options = [1, 2, 3, 4, 5];

  public toggleOpenSearch() {
    this.searchIsOpen.set(!this.searchIsOpen());
  }

  @HostListener('click', ['$event'])
  ondDocumentClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (!target.closest('.search')) {
      this.searchIsOpen.set(false);
    }
  }

  @HostListener('keydown.escape')
  onEscPress() {
    this.searchIsOpen.set(false);
  }
}
