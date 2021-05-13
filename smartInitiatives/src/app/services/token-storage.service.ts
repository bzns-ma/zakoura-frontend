import { Injectable } from '@angular/core';


const TOKEN_KEY = 'auth-token';
const USER_KEY  = 'auth-user';
const TIMER_KEY = 'timer'
@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {

  constructor() { }

  signOut(): void {
    window.sessionStorage.clear();
  }

  public saveToken(token: string): void {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string {
    return sessionStorage.getItem(TOKEN_KEY);
  }

  public saveUser(user): void {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  public getUser(): any {
    return JSON.parse(sessionStorage.getItem(USER_KEY));
  }

  public setTimer(time_to_login){
    window.sessionStorage.removeItem(TIMER_KEY);
    window.sessionStorage.setItem(TIMER_KEY, time_to_login);
  }

  public getTimer(){
    return  JSON.parse(sessionStorage.getItem(TIMER_KEY));

  }
}
