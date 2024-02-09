import { Component, OnInit } from '@angular/core';
import { WallService } from '../../services/wall/wall.service';
import { Wall } from 'src/app/interfaces/wall';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  images!: Wall[];
  api = environment.apiUrl + '/uploads';

  constructor(private wallService: WallService) {}

  ngOnInit(): void {
    this.wallService.fetchAllImages().subscribe({
      next: (images: Wall[]) => {
        this.images = images;
      },
    });
  }
}
