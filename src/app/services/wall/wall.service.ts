import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WallService {
  constructor(private http: HttpClient) {}

  fetchAllImages(): Observable<any> {
    return this.http.get('http://localhost:3002/walls');
  }
}
