import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent {
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
}
