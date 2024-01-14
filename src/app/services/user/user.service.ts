import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/interfaces/user';
import { UserResponse } from 'src/app/interfaces/user-response';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  public isAuthenticated(): Boolean {
    let userData = localStorage.getItem('userInfo');
    if (userData && JSON.parse(userData)) {
      return true;
    }
    return false;
  }

  public setUserInfo(user: User) {
    localStorage.setItem('userInfo', JSON.stringify(user));
  }

  public deleteUserInfo(user: User) {
    localStorage.removeItem('userInfo');
  }

  login(user: User): Observable<Response> {
    return this.http.post<Response>('http://localhost:3002/login', {
      user,
    });
  }

  logout(): Observable<Response> {
    return this.http.get<Response>('http://localhost:3002/logout');
  }

  createUser(newUser: User): Observable<UserResponse> {
    return this.http.post<UserResponse>('http://localhost:3002/users', newUser);
  }

  deleteUser(user: User): Observable<any> {
    return this.http.delete('http://localhost:3002/users', { body: user });
  }
}
