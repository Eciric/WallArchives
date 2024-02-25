import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Wall } from 'src/app/interfaces/wall';
import { environment } from 'src/environments/environment';
import { WallResponse } from 'src/app/interfaces/wall-response';

@Injectable({
  providedIn: 'root',
})
export class WallService {
  api: string = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getWall(wallId: string): Observable<Wall> {
    return this.http.get<Wall>(`${this.api}/walls/${wallId}`);
  }

  getWalls(
    currentPage: number = 1,
    limit: number = 10
  ): Observable<WallResponse> {
    return this.http.get<WallResponse>(
      `${this.api}/walls?page=${currentPage}&limit=${limit}`
    );
  }

  getWallsByKeyword(
    keyword: string = 'all',
    currentPage: number = 1,
    limit: number = 10
  ): Observable<WallResponse> {
    keyword = !keyword.length ? 'all' : keyword;
    return this.http.get<WallResponse>(
      `${this.api}/walls/keyword/${keyword}?page=${currentPage}&limit=${limit}`
    );
  }

  addWall(wall: Wall, image: File, uid: string): Observable<Wall> {
    let formData = new FormData();
    formData.append('wall', JSON.stringify(wall));
    formData.append('image', image);
    formData.append('_uid', uid);
    return this.http.post<Wall>(`${this.api}/walls`, formData);
  }
}
