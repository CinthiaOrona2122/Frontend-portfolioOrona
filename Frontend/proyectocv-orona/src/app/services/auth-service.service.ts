import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Login } from '../models/login';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  public apiServerUrl = environment.apiBaseUrl;

  httpOptions = {
    headers: new HttpHeaders().set('Content-Type', 'application/json')
      .set('Content-Type', 'application/x-www-form-urlencoded')
  };


  constructor(private http: HttpClient) {
    console.log("El servicio de autenticación está corriendo");
  }

  public login(credentials: Login): Observable<Boolean> {
    return this.http.post<Boolean>(`${this.apiServerUrl}/login`, credentials).pipe(
      tap((response: Boolean) => {
        if (response)
          sessionStorage.setItem("user", "cinthia");
      })
    );
  }

  public logout(): void {
    sessionStorage.removeItem("user");
  }

  public isUserLogged(): boolean {
    return sessionStorage.getItem("user") !== null;
  }
}