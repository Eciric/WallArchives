import { DOCUMENT } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Inject,
  Input,
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
  bottomReached: boolean = false;
  api: string = environment.apiUrl + '/uploads';

  constructor(
    @Inject(DOCUMENT) private _document: Document,
    private router: Router
  ) {}

  ngAfterViewInit(): void {
    this._document.body!.addEventListener('scroll', () => this.onScroll());
  }

  ngOnDestroy(): void {
    this._document.body!.removeEventListener('scroll', () => this.onScroll());
  }

  onScroll(): void {
    let container: HTMLElement = this.wallContainer.nativeElement;

    var rect = container.getBoundingClientRect();
    if (rect.bottom <= window.innerHeight && !this.bottomReached) {
      this.bottomReached = true;
      this.endReached.emit(this.wallResponse);
    }
  }

  wallClicked(image: Wall): void {
    this.router.navigate([`/wall/${image._id}`], { state: { ...image } });
  }
}
