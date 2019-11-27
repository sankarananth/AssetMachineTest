import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PurchaseService {

  baseUrl=environment.rootUrl;
  constructor(private http:HttpClient) { }
 
  searchasset(name:string):Observable<any>
  {
    return this.http.get(this.baseUrl+'/Purchase?name='+name);
  }
}
