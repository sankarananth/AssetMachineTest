import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Vendor } from './vendor';

@Injectable({
  providedIn: 'root'
})
export class VendorService {
  baseUrl=environment.rootUrl;
  constructor(private http:HttpClient) { }
  getVendorList():Observable<any>
  {
    return this.http.get(this.baseUrl+'/vendor');
  }
  checkVendor(vendor:Vendor):Observable<any>
  {
    return this.http.get(this.baseUrl+'/vendor?name='+vendor.vd_name);
  }
  addVendor(vendor:Vendor)
  {
    return this.http.post(this.baseUrl+'/vendor',vendor);
  }
  getVendor(id:number):Observable<any>
  {
     return this.http.get(this.baseUrl+'/vendor/'+id);
  }
  updateVendor(id:number,vendor:Vendor)
  {
    return this.http.put(this.baseUrl+'/vendor/'+id,vendor);
  }
  deleteV(id:number)
  {
    return this.http.delete(this.baseUrl+'/vendor/'+id);
  }
}
