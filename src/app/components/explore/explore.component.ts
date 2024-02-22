import { Component } from '@angular/core';
import { WallResponse } from 'src/app/interfaces/wall-response';
import { WallService } from 'src/app/services/wall/wall.service';

@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.css'],
})
export class ExploreComponent {
  wallResponses: WallResponse[] = [];
  constructor(private wallService: WallService) {}

  onWallsEmitted(wallResponse: WallResponse) {
    this.wallResponses = [wallResponse];
  }

  onEndReached(wallResponse: WallResponse) {
    this.wallService.getWalls(wallResponse.currentPage + 1, wallResponse.limit);
  }
}
