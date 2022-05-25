import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Education } from '../models/education'

@Injectable({
  providedIn: 'root'
})
export class EducationService {
  public apiServerUrl = environment.apiBaseUrl + '/education';

  httpOptions = {
    headers: new HttpHeaders().set('Content-Type', 'application/json')
      .set('Content-Type', 'application/x-www-form-urlencoded')
  };


  //prueba interpolación de educacion a persona
  private school_name = new BehaviorSubject('Universidad de Buenos Aires');
  private edu_image = new BehaviorSubject('https://i.ibb.co/9VhmqQ9/uba.png');
  currentSchool_name = this.school_name.asObservable(); 
  currentImage = this.edu_image.asObservable();

  
  constructor(private http: HttpClient) { }

  public getAll(): Observable<Education[]> {
    return this.http.get<any>(`${this.apiServerUrl}/all`);  //all
  }

  public getById(id: number): Observable<Education> {
    return this.http.get<any>(`${this.apiServerUrl}/find/${id}`);  //byId
  }

  public save(education: Education): Observable<Education> {
    return this.http.post<any>(`${this.apiServerUrl}/create`, education); //create
  }

  public update(id: number, education: Education): Observable<any> {
    return this.http.put<any>(`${this.apiServerUrl}/update/${id}`, education);  //update
  }

  public delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/delete/${id}`);
  }

}
