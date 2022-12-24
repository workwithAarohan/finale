import { Injectable } from '@angular/core';

export interface UserDetails {
  id: number;
  firstName: string;
  lastName: string;
  userName: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {

  constructor() { }

  public setRoles(roles: []) {
    localStorage.setItem("roles", JSON.stringify(roles));
  }

  public getRoles(): [] {
    return JSON.parse(localStorage.getItem("roles"));
  }

  public setToken(jwtToken: string) {
    localStorage.setItem("token", jwtToken);
  }

  public getToken(): string {
    return localStorage.getItem("token");
  }

  public setUserName(userName) {
    localStorage.setItem("userName", userName);
  }

  public getUserName(): string {
    return localStorage.getItem("userName");
  }

  public setUserId(userId: number) {
    localStorage.setItem("userId", JSON.stringify(userId));
  }

  public getUserId(): string {
    return localStorage.getItem("userId");
  }

  public clear() { 
    localStorage.clear();
  }

  public isLoggedIn() {
    return this.getRoles() && this.getToken();
  }
}
