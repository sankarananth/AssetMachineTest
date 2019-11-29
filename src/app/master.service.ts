import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Master } from './master';

@Injectable({
  providedIn: 'root'
})
export class MasterService {

  constructor(private http:HttpClient) { }
  baseUrl=environment.rootUrl;
  searchOrder(orderNo:string):Observable<any>
  {
    return this.http.get(this.baseUrl+'/AssetMaster?orderno='+orderNo)
  }
  addAssetMaster(orderno:string,assetname:string,vendorname:string,assetype:string,quantity:string,masterasset:Master)
  {
     return this.http.post(this.baseUrl+'/AssetMaster?orderno='+orderno+'&&assetname='+assetname+'&&vendorname='+vendorname+'&&assettype='+assetype+'&&quantity='+quantity,masterasset);
  }
  getMasterList():Observable<any>
  {
    return this.http.get(this.baseUrl+'/AssetMaster')
  }
  getMaster(id:number):Observable<any>
  {
    return this.http.get(this.baseUrl+'/AssetMaster/'+id)
  }
  updateMaster(id:number,master:Master)
  {
    return this.http.put(this.baseUrl+'/AssetMaster/'+id,master);
  }
}
