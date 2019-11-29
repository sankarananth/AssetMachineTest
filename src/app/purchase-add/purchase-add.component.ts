import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PurchaseService } from '../purchase.service';
import { Observable } from 'rxjs';
import { Assettype } from '../assettype';
import { AssetService } from '../asset.service';
import { Vendor } from '../vendor';
import { Purchase } from '../purchase';
import { Asset } from '../asset';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-purchase-add',
  templateUrl: './purchase-add.component.html',
  styleUrls: ['./purchase-add.component.scss']
})
export class PurchaseAddComponent implements OnInit {

  purchaseForm: FormGroup;
  message: string;
  assetname: string;
  typeid: number;
  title: string = "Asset Management System";
  asset: Asset = new Asset();
  purchase: Purchase = new Purchase();
  vendors: Observable<Vendor[]>;
  assettypes: Observable<Assettype[]>;
  constructor(private pFormBuilder: FormBuilder, private purchaseService: PurchaseService, private assetservice: AssetService, private toastr: ToastrService, private authservice: AuthService, private router: Router) { }
  num: number;
  orderNo: string;
  username: string;
  ngOnInit() {
    this.num = Math.floor(Math.random() * 9000) + 1000;
    this.username = localStorage.getItem('userID');
    this.orderNo = 'P' + this.num;
    this.purchaseForm = this.pFormBuilder.group({
      purchaseOrderno: ['', Validators.required],
      assetName: ['', Validators.required],
      assetType: ['', Validators.required],
      purchaseQty: ['', Validators.required],
      vendorName: ['', Validators.required],
      orderDate: ['', Validators.required],
      purchaseStatus: ['', Validators.required]
    });
    this.purchaseForm.controls.purchaseOrderno.setValue(this.orderNo);
  }
  get formControls() {
    return this.purchaseForm.controls;
  }
  onChange() {
    this.typeid = this.purchaseForm.controls.assetType.value;
    this.vendors = this.purchaseService.searchVendor(this.typeid)
  }
  addPurchaseOrder(buttonType): void {
    if (buttonType === "Search") {
      console.log(buttonType)
      this.assetname = this.purchaseForm.controls.assetName.value;
      this.assettypes = this.purchaseService.searchasset(this.assetname);
      this.assettypes.subscribe(x => {
        if (x.length == 0) {
          this.message = "This asset is not Available";
        }
      })
    }
    if (buttonType === "Add") {
      console.log(buttonType)
      this.purchase.pd_orderno = this.purchaseForm.controls.purchaseOrderno.value;
      this.assetname = this.purchaseForm.controls.assetName.value;
      this.purchaseService.getAssetId(this.assetname).subscribe(x => {
        this.asset = x;
        this.purchase.pd_ad_id = this.asset.ad_id;
        this.purchase.pd_type_id = this.purchaseForm.controls.assetType.value;
        this.purchase.pd_vendor_id = this.purchaseForm.controls.vendorName.value;
        this.purchase.pd_odate = this.purchaseForm.controls.orderDate.value;
        this.purchase.pd_qty = this.purchaseForm.controls.purchaseQty.value;
        this.purchase.pd_status = "Purchase Order raised";
        console.log(this.purchase);
        this.purchaseService.addPurchase(this.purchase).subscribe(x => {
          this.toastr.success('Purchase Order Added', 'Successfull Yipeee!');
        })
        this.purchaseForm.reset();
      });

    }

  }
  clearMessage() {
    this.message = ""
  }
  logOut() {
    this.authservice.logout();
    this.router.navigate(['login']);
  }

}
