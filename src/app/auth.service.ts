import { Injectable } from '@angular/core';
import { Loginuser } from './loginuser';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl=environment.rootUrl ;

  constructor(private http:HttpClient) { }
  public login(userinfo:Loginuser):Observable<any>
  {
    localStorage.setItem('ACCESS_TOKEN','access_token');
    localStorage.setItem('userID',userinfo.email);
    return this.http.get(this.baseUrl+'/login?user='+userinfo.email+'&pass='+userinfo.password)
  }
  public isLoggedIn(){
    return localStorage.getItem('ACCESS_TOKEN')!==null;
  }
  public logout(){
    localStorage.removeItem('ACCESS_TOKEN');
    localStorage.removeItem('userID');
  }
}