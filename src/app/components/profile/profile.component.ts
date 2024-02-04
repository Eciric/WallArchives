import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { User } from 'src/app/interfaces/user';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  constructor(private userService: UserService) {}
  user: User = {} as User;
  currentControl = 'info';
  controls = [
    { value: 'info', name: 'my info', state: true },
    { value: 'wall', name: 'my wallpapers', state: false },
  ];
  controlClicked(emitted: number): void {
    this.controls.map((control) => (control.state = false));
    this.controls[emitted].state = true;
    this.currentControl = this.controls[emitted].value;
  }

  ngOnInit(): void {
    let user = this.userService.getUserInfo();
    if (user) {
    }
  }
}
