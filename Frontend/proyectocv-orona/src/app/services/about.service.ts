import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { About } from '../models/about'
import { environment } from 'src/environments/environment.prod';


@Injectable({
  providedIn: 'root'
})
export class AboutService {
  public apiServerUrl = environment.apiBaseUrl + '/about';

  httpOptions = {
    headers: new HttpHeaders().set('Content-Type', 'application/json')
      .set('Content-Type', 'application/x-www-form-urlencoded')
  };

  
  constructor(private http: HttpClient) { }

  public getAll(): Observable<About[]> {
    return this.http.get<any>(`${this.apiServerUrl}/all`);  //all
  }

  public getById(id: number): Observable<About> {
    return this.http.get<any>(`${this.apiServerUrl}/find/${id}`);  //byId
  }

  public save(about: About): Observable<About> {
    return this.http.post<any>(`${this.apiServerUrl}/create`, about); //create
  }

  public update(id: number, about: About): Observable<any> {
    return this.http.put<any>(`${this.apiServerUrl}/update/${id}`, about);  //update
  }

  public delete(id: number): Observable<void> {
    return this.http.delete<any>(`${this.apiServerUrl}/delete/${id}`);
  }
}
