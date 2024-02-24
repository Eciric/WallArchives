import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { UserResponse } from 'src/app/interfaces/user-response';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent {
  user: UserResponse = {} as UserResponse;
  currentControl = 'info';
  controls = [
    { value: 'info', name: 'my info', state: true },
    { value: 'wall', name: 'my wallpapers', state: false },
  ];

  constructor(private userService: UserService, private router: Router) {}

  controlClicked(emitted: number): void {
    this.controls.map((control) => (control.state = false));
    this.controls[emitted].state = true;
    this.currentControl = this.controls[emitted].value;
  }
}
