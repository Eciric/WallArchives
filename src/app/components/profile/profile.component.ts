import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent {
  controls = [
    { name: 'my info', state: true },
    { name: 'my wallpapers', state: false },
  ];
  controlClicked(emitted: number): void {
    this.controls.map((control) => (control.state = false));
    this.controls[emitted].state = true;
  }
}
