import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AssetService } from '../asset.service';
import { Observable } from 'rxjs';
import { Assettype } from '../assettype';
import { Asset } from '../asset';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-asset-add',
  templateUrl: './asset-add.component.html',
  styleUrls: ['./asset-add.component.scss']
})
export class AssetAddComponent implements OnInit {

  assetForm:FormGroup;
  title:string="Asset Creation";
  assettypes:Observable<Assettype[]>;
  asset:Asset=new Asset();
  message:string;
  username:string;
  isSubmitted=false;
  constructor(private assetservice:AssetService,private asFormBuilder:FormBuilder,private toastr:ToastrService,private router:Router,private authservice:AuthService) { }

  ngOnInit() {
    this.assettypes=this.assetservice.getAssettypes(); //Populate the dropdown using this function
    this.assetForm=this.asFormBuilder.group({
      assetName:['',Validators.required],
      assetType:['',Validators.required],
      assetclass:['',Validators.required]
    });
    this.username=localStorage.getItem('userID'); //Afte login this gets the entered username/email
  }
  get formControls(){
    return this.assetForm.controls;
  }
  addAsset() //function to add assets
  {
    this.isSubmitted=true;
    if(this.assetForm.invalid)
    {
      return;
    }
    this.asset.ad_name=this.assetForm.controls.assetName.value;
    this.asset.ad_type_id=this.assetForm.controls.assetType.value;
    this.asset.ad_class=this.assetForm.controls.assetclass.value;
    console.log(this.asset);
    this.assetservice.checkAsset(this.asset).subscribe(x => {
      console.log(x);
      if (x == 0) {
        this.assetservice.addAssets(this.asset).subscribe(x => {
          this.toastr.success('Assets Added', 'Good for you');
          this.assetForm.reset();
        })
      }
      else{
            this.message="This Asset Already exists";
      } 
      
    })
   
 }
 clearMessage() //function to clear the message on textchange event of the textbox 
 {
   this.message=""
 }
 logOut() //Logout and re-route to login component
  {
    this.authservice.logout();
    this.router.navigate(['login']);
  }

}
