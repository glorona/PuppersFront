import { Injectable } from '@angular/core';

const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';
const USER_ROLE = '';
const USER_ID = '';
@Injectable({
  providedIn: 'root'
})
export class TokenService {
  constructor() { }

  signOut(): void {
    window.sessionStorage.clear();
  }

  public saveToken(token: string): void {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string | null {
    return window.sessionStorage.getItem(TOKEN_KEY);
  }

  public saveUser(user: any): void {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  public saveRoles(roles: any): void{
    window.sessionStorage.setItem(USER_ROLE,roles);
  }

  public saveID(id: any): void{
    window.sessionStorage.setItem(USER_ID,id);

  }
  public getRoles(): any{
    const roles = window.sessionStorage.getItem(USER_ROLE);
    if (roles){
      return roles;
    }

    return {};
  }

  public getId(): any{
    const id = window.sessionStorage.getItem(USER_ID);
    console.log(id);
    if(id){
      return id;
    }
    return {};

  }

  public getUser(): any {
    const user = window.sessionStorage.getItem(USER_KEY);
    if (user) {
      return JSON.parse(user);
    }

    return {};
  }
}