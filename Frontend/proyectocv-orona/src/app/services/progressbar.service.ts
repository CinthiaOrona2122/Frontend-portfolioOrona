import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Progressbar } from '../models/progressbar'
import { environment } from 'src/environments/environment.prod';


@Injectable({
  providedIn: 'root'
})
export class ProgressbarService {
  public apiServerUrl = environment.apiBaseUrl + '/progress';

  httpOptions = {
    headers: new HttpHeaders().set('Content-Type', 'application/json')
      .set('Content-Type', 'application/x-www-form-urlencoded')
  };


  constructor(private http: HttpClient) { }

  public getAll(): Observable<Progressbar[]> {
    return this.http.get<any>(`${this.apiServerUrl}/all`);  //all
  }

  public getById(id: number): Observable<Progressbar> {
    return this.http.get<any>(`${this.apiServerUrl}/find/${id}`);  //byId
  }

  public save(progressbar: Progressbar): Observable<Progressbar> {
    return this.http.post<any>(`${this.apiServerUrl}/create`, progressbar); //create
  }

  public update(id: number, progressbar: Progressbar): Observable<any> {
    return this.http.put<any>(`${this.apiServerUrl}/update/${id}`, progressbar);  //update
  }

  public delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/delete/${id}`);
  }

}
