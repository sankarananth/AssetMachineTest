import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AssetService } from '../asset.service';
import { Asset } from '../asset';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-asset-get',
  templateUrl: './asset-get.component.html',
  styleUrls: ['./asset-get.component.scss']
})
export class AssetGetComponent implements OnInit {
title:string="Asset Creation";
assets:Observable<Asset[]>;
public popoverTitle: string = 'Delete';
  public popoverMessage: string = 'Do you want to delete this Asset?';
  public confirmClicked: boolean = false;
  public cancelClicked: boolean = false;
  username:string;
  constructor(private assetservice:AssetService,private toastr:ToastrService,private authservice:AuthService,private router:Router) { }

  ngOnInit() {
    this.assets=this.assetservice.getAssetList();
    this.username=localStorage.getItem('userID');
  }
  DeleteAsset(id:number) //function to delete assets
  {
    this.assetservice.deleteAsset(id).subscribe(x=>{
      this.toastr.error('Asset Deleted',':(');
      this.ngOnInit();
    });
    
  }
  logOut()
  {
    this.authservice.logout();
    this.router.navigate(['login'])
  }

}
