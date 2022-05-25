import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Achievement } from '../models/achievement'
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class AchievementsService {
  public apiServerUrl = environment.apiBaseUrl + '/achievement';

  httpOptions = {
    headers: new HttpHeaders().set('Content-Type', 'application/json')
      .set('Content-Type', 'application/x-www-form-urlencoded')
  };


  constructor(private http: HttpClient) { }

  public getAll(): Observable<Achievement[]> {
    return this.http.get<any>(`${this.apiServerUrl}/all`);  //all
  }

  public getById(id: number): Observable<Achievement> {
    return this.http.get<any>(`${this.apiServerUrl}/find/${id}`);  //byId
  }

  public save(achievement: Achievement): Observable<Achievement> {
    return this.http.post<any>(`${this.apiServerUrl}/create`, achievement); //create
  }

  public update(id: number, achievement: Achievement): Observable<any> {
    return this.http.put<any>(`${this.apiServerUrl}/update/${id}`, achievement);  //update
  }

  public delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/delete/${id}`);
  }
  


}
