import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { Experience } from '../models/experience'
import { environment } from 'src/environments/environment.prod';



@Injectable({
  providedIn: 'root'
})
export class ExperienceService {
  public apiServerUrl = environment.apiBaseUrl + '/experience';

  httpOptions = {
    headers: new HttpHeaders().set('Content-Type', 'application/json')
      .set('Content-Type', 'application/x-www-form-urlencoded')
  };


  //prueba interpolacion de eXperiencia a persona
  private job_image = new BehaviorSubject('https://i.ibb.co/KqhtbVw/conicet.png');
  private company_name = new BehaviorSubject('CONICET');
  private position = new BehaviorSubject('Informático');
  currentCompany_name = this.company_name.asObservable(); 
  currentPosition = this.position.asObservable(); 
  currentImage = this.job_image.asObservable();


  constructor(private http: HttpClient) { }

  public getAll(): Observable<Experience[]> {
    return this.http.get<any>(`${this.apiServerUrl}/all`);  //all
  }

  public getById(id: number): Observable<Experience> {
    return this.http.get<any>(`${this.apiServerUrl}/find/${id}`);  //byId
  }

  public save(experience: Experience): Observable<Experience> {
    return this.http.post<any>(`${this.apiServerUrl}/create`, experience); //create
  }

  public update(id: number, experience: Experience): Observable<any> {
    return this.http.put<any>(`${this.apiServerUrl}/update/${id}`, experience);  //update
  }

  public delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/delete/${id}`);
  }

  //Methods
  changeCompany_name(value: any){
    this.company_name.next(value);
  }

  changePosition(value: any){
    this.position.next(value);
  }
  
  changeJob_image(value: any){
    this.job_image.next(value);
  }
}
