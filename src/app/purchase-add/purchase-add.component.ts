import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PurchaseService } from '../purchase.service';
import { Observable } from 'rxjs';
import { Assettype } from '../assettype';
import { AssetService } from '../asset.service';

@Component({
  selector: 'app-purchase-add',
  templateUrl: './purchase-add.component.html',
  styleUrls: ['./purchase-add.component.scss']
})
export class PurchaseAddComponent implements OnInit {
 
  purchaseForm:FormGroup;
  assetname:string;
  assettypes:Observable<Assettype[]>;
    constructor(private pFormBuilder:FormBuilder,private purchaseService:PurchaseService,private assetservice:AssetService) { }
  num:number;
  orderNo:string;
  ngOnInit() {
    this.assettypes=this.assetservice.getAssettypes();
    this.num=Math.floor(Math.random() * 9000) + 1000;
    this.orderNo='P'+this.num;
    this.purchaseForm=this.pFormBuilder.group({
      purchaseOrderno:['',Validators.required],
      assetName:['',Validators.required],
      assetType:['',Validators.required],
      purchaseQty:['',Validators.required],
      vendorName:['',Validators.required],
      orderDate:['',Validators.required],
      purchaseStatus:['',Validators.required]
    });
    this.purchaseForm.controls.purchaseOrderno.setValue(this.orderNo);
  }
  get formControls() {
    return this.purchaseForm.controls;
  }
  searchAsset()
  {
    this.assetname=this.purchaseForm.controls.assetName.value;
    
  }

}
