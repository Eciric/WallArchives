import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { UserResponse } from 'src/app/interfaces/user-response';
import { Wall } from 'src/app/interfaces/wall';
import { WallResponse } from 'src/app/interfaces/wall-response';
import { UserService } from 'src/app/services/user/user.service';
import { WallService } from 'src/app/services/wall/wall.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  user: UserResponse = {} as UserResponse;
  userWallResponse!: WallResponse;
  currentControl = 'info';
  controls = [
    { value: 'info', name: 'my info', state: true },
    { value: 'wall', name: 'my wallpapers', state: false },
  ];

  constructor(
    private userService: UserService,
    private router: Router,
    private wallService: WallService
  ) {}

  ngOnInit(): void {
    this.user = this.userService.getUserInfo() || ({} as UserResponse);
  }

  controlClicked(emitted: number): void {
    this.controls.map((control) => (control.state = false));
    this.controls[emitted].state = true;
    this.currentControl = this.controls[emitted].value;
    if (this.currentControl == 'wall') {
      this.fetchUserWalls();
    }
  }

  fetchUserWalls(): void {
    this.wallService.getWallsByUID(this.user.uid).subscribe({
      next: (wallResponse: WallResponse) => {
        if (wallResponse) {
          this.userWallResponse = wallResponse;
        }
      },
      error: (error: any) => {
        console.error(error);
      },
    });
  }
}
