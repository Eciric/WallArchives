import { Component } from '@angular/core';
import { WallResponse } from 'src/app/interfaces/wall-response';
import { WallService } from 'src/app/services/wall/wall.service';

@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.css'],
})
export class ExploreComponent {
  search: string = '';
  wallResponses: WallResponse[] = [];
  constructor(private wallService: WallService) {}

  onWallsEmitted(wallResponse: WallResponse) {
    this.wallResponses = [wallResponse];
  }

  onEndReached(wallResponse: WallResponse) {
    if (wallResponse.currentPage >= wallResponse.totalPages) return;

    this.wallService
      .getWallsByKeyword(
        this.search,
        wallResponse.currentPage + 1,
        wallResponse.limit
      )
      .subscribe({
        next: (response: WallResponse) => {
          this.wallResponses.push(response);
        },
      });
  }
}
