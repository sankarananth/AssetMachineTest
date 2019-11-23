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
  addVendor(vendor:Vendor)
  {
    return this.http.post(this.baseUrl+'/vendor',vendor);
  }
}
