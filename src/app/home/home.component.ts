import { Component, OnInit } from '@angular/core';
import { WallService } from '../services/wall.service';
import { DomSanitizer } from '@angular/platform-browser';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  imageURL!: unknown;

  constructor(
    private wallService: WallService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.wallService.fetchTestImage().subscribe({
      next: (blob) => {
        this.imageURL = URL.createObjectURL(blob);
      },
      error: (e) => {
        console.error(e);
      },
      complete: () => {
        console.log('Completed');
      },
    });
  }
}
