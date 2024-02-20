import { Component } from '@angular/core';
import { Wall } from 'src/app/interfaces/wall';
import { WallService } from 'src/app/services/wall/wall.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.css'],
})
export class ExploreComponent {
  images: Wall[] = [];
  api: string = environment.apiUrl + '/uploads';

  onWallsEmitted(walls: Wall[]) {
    this.images = walls;
  }
}
