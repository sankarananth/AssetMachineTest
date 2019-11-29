import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AssetService } from '../asset.service';
import { PurchaseService } from '../purchase.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Purchase } from '../purchase';
import { element } from 'protractor';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-purchase-edit',
  templateUrl: './purchase-edit.component.html',
  styleUrls: ['./purchase-edit.component.scss']
})
export class PurchaseEditComponent implements OnInit {

  purchaseForm: FormGroup;
  id: number;
  title: string = "Asset Management System";
  username: string;
  purchase: Purchase = new Purchase;
  constructor(private pFormBuilder: FormBuilder, private purchaseService: PurchaseService, private assetservice: AssetService, private toastr: ToastrService, private route: ActivatedRoute, private router: Router, private authservice: AuthService) { }

  ngOnInit() {
    this.username = localStorage.getItem('userID');
    this.purchaseForm = this.pFormBuilder.group({
      purchaseId: ['', Validators.required],
      deliveryDate: ['', Validators.required],
      purchaseOrderno: ['', Validators.required],
      assetName: ['', Validators.required],
      assetType: ['', Validators.required],
      purchaseQty: ['', Validators.required],
      vendorName: ['', Validators.required],
      orderDate: ['', Validators.required],
      purchaseStatus: ['', Validators.required]
    });
    this.id = this.route.snapshot.params["id"];
    this.purchaseService.getPurchaseById(this.id).subscribe(x => {
      x.forEach(element => {
        this.purchase.pd_id = element["pd_id"];
        this.purchase.pd_vendor_id = element["pd_vendor_id"];
        this.purchase.pd_odate = element["pd_odate"];
        this.purchase.pd_type_id = element["pd_type_id"];
        this.purchase.pd_qty = element["pd_qty"];
        this.purchase.pd_orderno = element["pd_orderno"];
        this.purchase.pd_ad_id = element["pd_ad_id"];
      });
    });
  }
  get formControls() {
    return this.purchaseForm.controls;
  }
  updatePurchaseOrder() {
    this.id = this.purchaseForm.controls.purchaseId.value;
    this.purchase.pd_id = this.purchaseForm.controls.purchaseId.value;
    this.purchase.pd_ad_id = this.purchaseForm.controls.assetName.value;
    this.purchase.pd_vendor_id = this.purchaseForm.controls.vendorName.value;
    this.purchase.pd_type_id = this.purchaseForm.controls.assetType.value;
    this.purchase.pd_qty = this.purchaseForm.controls.purchaseQty.value;
    this.purchase.pd_orderno = this.purchaseForm.controls.purchaseOrderno.value;
    this.purchase.pd_odate = this.purchaseForm.controls.orderDate.value;
    this.purchase.pd_ddate = this.purchaseForm.controls.deliveryDate.value;
    this.purchase.pd_status = "Registered Internally";
    console.log(this.purchase);
    this.purchaseService.updatePurchase(this.id, this.purchase).subscribe(x => {
      this.toastr.success('Updated Man', 'Booyah');
      this.router.navigate(['purchaselist']);
    });
  }
  logOut() {
    this.authservice.logout();
    this.router.navigate(['login']);
  }

}
