import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Asset } from './asset';

@Injectable({
  providedIn: 'root'
})
export class AssetService {
baseUrl=environment.rootUrl;
  constructor(private http:HttpClient) { }
  getAssetList():Observable<any>
  {
    return this.http.get(this.baseUrl+'/assetdefs')
  }
  getAssettypes():Observable<any>
  {
    return this.http.get(this.baseUrl+'/assettype')
  }
  checkAsset(asset:Asset):Observable<any>
  {
    return this.http.get(this.baseUrl+'/assetdefs?name='+asset.ad_name)
  }
  addAssets(asset:Asset)
  {
    return this.http.post(this.baseUrl+'/assetdefs',asset)
  }
  getAsset(id:number):Observable<any>
  {
    return this.http.get(this.baseUrl+'/assetdefs/'+id)
  }
  updateAsset(id:number,asset:Asset)
  {
    return this.http.put(this.baseUrl+'/assetdefs/'+id,asset);
  }
  deleteAsset(id:number)
  {
    return this.http.delete(this.baseUrl+'/assetdefs/'+id);
  }
}
