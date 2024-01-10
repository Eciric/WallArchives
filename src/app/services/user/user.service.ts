import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/interfaces/user';
import { UserResponse } from 'src/app/interfaces/user-response';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  createUser(newUser: User): Observable<UserResponse> {
    return this.http.post<UserResponse>('http://localhost:3002/users', newUser);
  }
}
