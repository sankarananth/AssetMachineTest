import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Assettype } from '../assettype';
import { Asset } from '../asset';
import { AssetService } from '../asset.service';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-asset-edit',
  templateUrl: './asset-edit.component.html',
  styleUrls: ['./asset-edit.component.scss']
})
export class AssetEditComponent implements OnInit {

  constructor(private route:ActivatedRoute,private router:Router,private assetservice:AssetService,private asFormBuilder:FormBuilder,private toastr:ToastrService,private authservice:AuthService) { }
  id:number;
  assetForm:FormGroup;
  title:string="Asset Creation";
  assettypes:Observable<Assettype[]>;
  asset:Asset=new Asset;
  message:string;
  username:string;

  ngOnInit() {
    this.assetForm=this.asFormBuilder.group({
      assetId:[Validators.required],
      assetName:[Validators.required],
      assetType:[Validators.required],
      assetclass:[Validators.required]
    });
    this.id=this.route.snapshot.params["id"];
    this.assettypes=this.assetservice.getAssettypes();
    this.assetservice.getAsset(this.id).subscribe(x=>{
        this.asset=x;
    });
    this.username=localStorage.getItem('userID');
  }
  get formControls(){
    return this.assetForm.controls;
  }
  upAsset()
  {
    this.asset.ad_id=this.id;
    this.asset.ad_name=this.assetForm.controls.assetName.value;
    this.asset.ad_type_id=this.assetForm.controls.assetType.value;
    this.asset.ad_class=this.assetForm.controls.assetclass.value;
    this.assetservice.updateAsset(this.id,this.asset).subscribe(x=>{
      this.toastr.success('Update Succesfull','Great!')
      this.ngOnInit();
    })
  }
  logOut()
  {
    this.authservice.logout();
    this.router.navigate(['login']);
  }
}
