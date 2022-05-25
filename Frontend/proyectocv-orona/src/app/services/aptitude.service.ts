import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Aptitude } from '../models/aptitude'


@Injectable({
  providedIn: 'root'
})
export class AptitudeService {
  public apiServerUrl = environment.apiBaseUrl + '/aptitude';

  httpOptions = {
    headers: new HttpHeaders().set('Content-Type', 'application/json')
      .set('Content-Type', 'application/x-www-form-urlencoded')
  };


  constructor(private http: HttpClient) { }

  
  public getAll(): Observable<Aptitude[]> {
    return this.http.get<any>(`${this.apiServerUrl}/all`);  //all
  }

  public getById(id: number): Observable<Aptitude> {
    return this.http.get<any>(`${this.apiServerUrl}/find/${id}`);  //byId
  }

  public save(aptitude: Aptitude): Observable<Aptitude> {
    return this.http.post<any>(`${this.apiServerUrl}/create`, aptitude); //create
  }

  public update(id: number, aptitude: Aptitude): Observable<any> {
    return this.http.put<any>(`${this.apiServerUrl}/update/${id}`, aptitude);  //update
  }

  public delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/delete/${id}`);
  }

}
