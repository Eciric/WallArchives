import { Component, OnInit } from '@angular/core';
import { WallService } from '../../services/wall/wall.service';
import { Wall } from 'src/app/interfaces/wall';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  imageURLS!: string[];
  api = 'http://localhost:3002/uploads';

  constructor(private wallService: WallService) {}

  ngOnInit(): void {
    this.wallService.fetchAllImages().subscribe({
      next: (images: Wall[]) => {
        this.imageURLS = images.map((image) => {
          return image.path;
        });
      },
    });
  }
}
