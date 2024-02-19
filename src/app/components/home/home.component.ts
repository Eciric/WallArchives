import { Component, OnInit } from '@angular/core';
import { WallService } from '../../services/wall/wall.service';
import { Wall } from 'src/app/interfaces/wall';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  images!: Wall[];
  api = environment.apiUrl + '/uploads';

  constructor(private wallService: WallService, private router: Router) {}

  ngOnInit(): void {
    this.wallService.getWalls().subscribe({
      next: (images: Wall[]) => {
        console.log(images);
        this.images = images;
      },
    });
  }

  wallClicked(image: Wall): void {
    this.router.navigate([`/wall/${image._id}`], { state: { ...image } });
  }
}
