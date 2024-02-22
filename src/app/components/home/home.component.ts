import { Component, OnInit } from '@angular/core';
import { WallService } from '../../services/wall/wall.service';
import { Wall } from 'src/app/interfaces/wall';
import { WallResponse } from 'src/app/interfaces/wall-response';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  wallResponse!: WallResponse;

  constructor(private wallService: WallService) {}

  ngOnInit(): void {
    this.wallService.getWalls().subscribe({
      next: (response: WallResponse) => {
        this.wallResponse = response;
      },
    });
  }
}
