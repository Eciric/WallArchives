import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Wall } from 'src/app/interfaces/wall';

@Injectable({
  providedIn: 'root',
})
export class WallService {
  constructor(private http: HttpClient) {}

  fetchAllImages(): Observable<Wall[]> {
    return this.http.get<Wall[]>('http://localhost:3002/walls');
  }
}
