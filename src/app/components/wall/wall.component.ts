import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserResponse } from 'src/app/interfaces/user-response';
import { Wall } from 'src/app/interfaces/wall';
import { UserService } from 'src/app/services/user/user.service';
import { WallService } from 'src/app/services/wall/wall.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-wall',
  templateUrl: './wall.component.html',
  styleUrls: ['./wall.component.css'],
})
export class WallComponent implements OnInit {
  api: string = environment.apiUrl + '/uploads';
  wallId!: string | null;
  wallTagsArr: string[] = [];
  wall!: Wall;
  user!: UserResponse;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private wallService: WallService
  ) {
    this.wall = this.router.getCurrentNavigation()?.extras.state as Wall;
  }

  ngOnInit(): void {
    this.wallId = this.route.snapshot.paramMap.get('id') || '';
    if (!this.wallId || !this.wallId.length) {
      this.router.navigate(['/']);
    }

    if (!this.wall) {
      this.wallService.getWall(this.wallId).subscribe({
        next: (wall: Wall) => {
          this.wall = wall;
        },
        error: (err: any) => {
          console.error(err);
        },
      });
    }

    if (!this.wall) {
      this.router.navigate(['/']);
      return;
    }

    this.wallTagsArr = this.wall.tags.split(',').map((tag) => tag.trim());
    this.userService.getUser(this.wall._uid).subscribe({
      next: (user: UserResponse) => {
        this.user = user;
      },
      error: (err: any) => {
        console.error(err);
      },
    });
  }
}
