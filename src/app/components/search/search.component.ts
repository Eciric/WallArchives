import { Component, EventEmitter, Output } from '@angular/core';
import { Wall } from 'src/app/interfaces/wall';
import { WallService } from 'src/app/services/wall/wall.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent {
  search: string = '';
  @Output() wallsEmitter: EventEmitter<Wall[]> = new EventEmitter();

  constructor(private wallService: WallService) {}

  onKeydown(event: Event) {
    event.preventDefault();
    this.wallService.getWallsByKeyword(this.search).subscribe({
      next: (walls: Wall[]) => {
        this.wallsEmitter.emit(walls);
      },
      error: (err: any) => {
        console.error('Failed getting walls by keyword: ', err);
      },
    });
  }
}
