import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Purchase } from './purchase';

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
  searchVendor(id:number):Observable<any>
  {
    return this.http.get(this.baseUrl+'/Purchase?id='+id);
  }
  getAssetId(name:string):Observable<any>
  {
    return this.http.get(this.baseUrl+'/Login?name='+name);
  }
  addPurchase(Purchase:Purchase)
  {
    return this.http.post(this.baseUrl+'/Purchase',Purchase);
  }
  getPurchaseList():Observable<any>
  {
    return this.http.get(this.baseUrl+'/Purchase');
  }
  getPurchaseById(id:number):Observable<any>
  {
    return this.http.get(this.baseUrl+'/Login?id='+id);
  }
  updatePurchase(id:number,purchase:Purchase)
  {
     return this.http.put(this.baseUrl+'/Purchase/'+id,purchase);
  }
  deletePurchase(id:number)
  {
    return this.http.delete(this.baseUrl+'/Purchase/'+id);
  }
}
