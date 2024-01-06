import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WallService {
  constructor(private http: HttpClient) {}

  fetchTestImage(): Observable<Blob> {
    return this.http.get('http://localhost:3002/uploads/test.png', {
      responseType: 'blob',
    });
  }
}
