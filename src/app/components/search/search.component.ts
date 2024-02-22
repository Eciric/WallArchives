import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Wall } from 'src/app/interfaces/wall';
import { WallResponse } from 'src/app/interfaces/wall-response';
import { WallService } from 'src/app/services/wall/wall.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent {
  @Input() search!: string;
  @Output() wallsEmitter: EventEmitter<WallResponse> = new EventEmitter();

  constructor(private wallService: WallService) {}

  onKeydown(event: Event) {
    event.preventDefault();
    this.wallService.getWallsByKeyword(this.search).subscribe({
      next: (response: WallResponse) => {
        this.wallsEmitter.emit(response);
      },
      error: (err: any) => {
        console.error('Failed getting walls by keyword: ', err);
      },
    });
  }
}
