import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Wall } from 'src/app/interfaces/wall';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class WallService {
  api: string = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getWalls(): Observable<Wall[]> {
    return this.http.get<Wall[]>(`${this.api}/walls`);
  }

  getWall(wallId: string): Observable<Wall> {
    return this.http.get<Wall>(`${this.api}/walls/${wallId}`);
  }
}
