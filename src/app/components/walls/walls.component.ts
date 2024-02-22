import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { Wall } from 'src/app/interfaces/wall';
import { WallResponse } from 'src/app/interfaces/wall-response';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-walls',
  templateUrl: './walls.component.html',
  styleUrls: ['./walls.component.css'],
})
export class WallsComponent implements AfterViewInit {
  @Input() wallResponse!: WallResponse;
  @Output() endReached: EventEmitter<WallResponse> = new EventEmitter();
  @ViewChild('wallContainer') wallContainer!: ElementRef;
  api: string = environment.apiUrl + '/uploads';

  constructor(private router: Router) {}

  ngAfterViewInit(): void {
    //TODO: Create an event listener on wallContainer and check if end of div reached,
    //then emit using endReached event emitter.
  }

  wallClicked(image: Wall): void {
    this.router.navigate([`/wall/${image._id}`], { state: { ...image } });
  }
}
