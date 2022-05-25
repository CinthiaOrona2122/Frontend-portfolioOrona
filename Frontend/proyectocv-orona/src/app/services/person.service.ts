import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Person } from '../models/person'

@Injectable({
  providedIn: 'root'
})
export class PersonaService {
  public apiServerUrl = environment.apiBaseUrl + '/person';
  
  httpOptions = {
    headers: new HttpHeaders().set('Content-Type', 'application/json')
      .set('Content-Type', 'application/x-www-form-urlencoded')
  };


  constructor(private http: HttpClient) { }

  public getAll(): Observable<Person[]> {
    return this.http.get<any>(`${this.apiServerUrl}/all`);  //all
  }

  public getById(id: number): Observable<Person> {
    return this.http.get<any>(`${this.apiServerUrl}/find/${id}`);  //byId
  }

  public save(person: Person): Observable<Person> {
    return this.http.post<any>(`${this.apiServerUrl}/create`, person); //create
  }

  public update(id: number, person: Person): Observable<any> {
    return this.http.put<any>(`${this.apiServerUrl}/update/${id}`, person);  //update
  }

  public delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/delete/${id}`);
  }
}
