import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-profile-control',
  templateUrl: './profile-control.component.html',
  styleUrls: ['./profile-control.component.css'],
})
export class ProfileControlComponent {
  @Input() value: string = '';
  @Input() index!: number;
  @Input() state: boolean = false;
  @Output() controlClicked = new EventEmitter();

  clickEvent(event: any) {
    this.state = !this.state;
    this.controlClicked.emit(this.index);
  }
}
