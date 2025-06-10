import { Component, HostListener, signal, WritableSignal } from '@angular/core';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

@Component({
  selector: 'app-search',
  imports: [MatAutocompleteModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
})
export class SearchComponent {
  public searchIsOpen: WritableSignal<boolean> = signal<boolean>(false);
  public options: unknown[] = [1, 2, 3, 4, 5];

  public toggleOpenSearch(): void {
    this.searchIsOpen.set(!this.searchIsOpen());
  }

  @HostListener('click', ['$event'])
  ondDocumentClick(event: MouseEvent): void {
    const target: HTMLElement = event.target as HTMLElement;
    if (!target.closest('.search')) {
      this.searchIsOpen.set(false);
    }
  }

  @HostListener('keydown.escape')
  onEscPress(): void {
    this.searchIsOpen.set(false);
  }
}
