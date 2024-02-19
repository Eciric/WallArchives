import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Wall } from 'src/app/interfaces/wall';
import { WallService } from 'src/app/services/wall/wall.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent {
  @Input() search!: string;
  @Output() wallEmitter!: EventEmitter<Wall[]>;

  constructor(private wallService: WallService) {}

  onKeydown(event: Event) {
    event.preventDefault();
    const target = event.target as HTMLInputElement;
    this.wallService.getWallsByKeyword(target.value).subscribe({
      next: (walls: Wall[]) => {
        this.wallEmitter.emit(walls);
      },
      error: (err: any) => {},
    });
  }
}
