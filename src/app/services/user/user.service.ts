import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/interfaces/user';
import { UserResponse } from 'src/app/interfaces/user-response';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  userApi: string = 'http://localhost:3002';

  constructor(private http: HttpClient) {}

  public isAuthenticated(): Boolean {
    let userData = localStorage.getItem('session');

    if (userData == undefined || userData == 'undefined') {
      this.deleteUserInfo();
      return false;
    }

    if (userData && JSON.parse(userData)) {
      return true;
    }

    return false;
  }

  public setUserInfo(user: UserResponse) {
    localStorage.setItem('userInfo', JSON.stringify({ ...user }));
  }

  public getUserInfo(): UserResponse {
    return JSON.parse(localStorage.getItem('userInfo') || '');
  }

  public deleteUserInfo() {
    localStorage.removeItem('userInfo');
  }

  login(user: User): Observable<UserResponse> {
    return this.http.post<UserResponse>(`${this.userApi}/sign-in`, user, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    });
  }

  logout(): Observable<any> {
    let user = this.getUserInfo();
    return this.http.get(`${this.userApi}/sign-out`, {
      headers: new HttpHeaders({ session: user.session }),
    });
  }

  createUser(newUser: User): Observable<UserResponse> {
    return this.http.post<UserResponse>(`${this.userApi}/users`, newUser, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    });
  }

  deleteUser(user: User): Observable<any> {
    return this.http.delete(`${this.userApi}/users`, { body: user });
  }

  getUser(id: string): Observable<UserResponse> {
    return this.http.get<UserResponse>(`${this.userApi}/users/${id}`);
  }
}
