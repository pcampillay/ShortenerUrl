import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private httpClient: HttpClient) { }

  public getDomain(){
    let url = "http://localhost:3003/domain";
    return this.httpClient.get(url);
  }

  public newShortener(obj : any){
    let url = "http://localhost:3003/";

    const payload = new HttpParams()
    .set('url',obj.url);

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/x-www-form-urlencoded',
      })
    };
    return this.httpClient.post(url, payload, httpOptions);
  }

}
