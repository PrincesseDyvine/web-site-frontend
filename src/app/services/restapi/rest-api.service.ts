import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AuthService} from "../security/auth.service";
import {User} from "../../models/user.model";
import {Observable} from "rxjs";
import {InscriptionModel} from "../../models/inscription.model";
import {PictureModel} from "../../models/picture.model";
import {UpdatePasswordModel} from "../../models/UpdatePasswordModel";

@Injectable({
  providedIn: 'root'
})
export class RestApiService {

  private apiUrl = "http://localhost:8888/users/api/v2/inscriptions";
  private apiUrlPic = "http://localhost:8888/users/api/v2/images";
  private apiUrlSec = "http://localhost:8888/users/api/v2/users";


  constructor(private http: HttpClient, public securityService: AuthService) { }

  private getHeader(){
    let jwt = this.securityService.getToken();
    jwt = "Bearer "+jwt;
    return new HttpHeaders({"Authorization": jwt});
  }


  public getProfile(): Observable<User>{
    let httpHeaders = this.getHeader();
    return this.http.get<User>(this.apiUrlSec + '/get', {headers:httpHeaders});
  }

  public inscription(model: InscriptionModel): Observable<InscriptionModel> {
    return this.http.post<InscriptionModel>(this.apiUrl +'/save', model);
  }

  uploadImage(file: File, filename: string): Observable<PictureModel>{
    const imageFormData = new FormData();
    imageFormData.append('image', file, filename);
    let httpHeaders = this.getHeader();
    return this.http.post<PictureModel>(this.apiUrlPic + '/upload', imageFormData, {headers:httpHeaders});
  }
  loadImage(id: number): Observable<PictureModel> {
    const url = `${this.apiUrlPic + '/image/get/info'}/${id}`;
    return this.http.get<PictureModel>(url);
  }

  getImage(): Observable<Array<number>>{
    let httpHeaders = this.getHeader();
    return this.http.get<Array<number>>(this.apiUrlPic + '/load',  {headers:httpHeaders});
  }

  getPicture(): Observable<PictureModel>{
    let httpHeaders = this.getHeader();
    return this.http.get<PictureModel>(this.apiUrlPic + '/read',  {headers:httpHeaders});
  }

  changePassword(model: UpdatePasswordModel): Observable<UpdatePasswordModel>{
    return this.http.post<UpdatePasswordModel>(this.apiUrl +'/pwd', model);
  }

  send(email: string){
    return this.http.get<string>(this.apiUrl +'/send/' + email);
  }

}
