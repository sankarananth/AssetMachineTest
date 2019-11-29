import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { MasterService } from '../master.service';
import { Masterview } from '../masterview';
import { element } from 'protractor';
import { Master } from '../master';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-master-add',
  templateUrl: './master-add.component.html',
  styleUrls: ['./master-add.component.scss']
})
export class MasterAddComponent implements OnInit {

  title: string = "Asset Management System";
  username: string;
  masterForm: FormGroup;
  masterview: Masterview = new Masterview;
  master: Master = new Master;
  public orderNo: string;
  order: string;
  warranty: string;
  assetName: string;
  vendorName: string;
  assetType: string;
  public num: number;
  public quantity: number;
  public snum: number;
  constructor(private mformBuilder: FormBuilder, private masterService: MasterService, private toastr: ToastrService, private authservice: AuthService, private router: Router) { }

  ngOnInit() {
    this.num = Math.floor(Math.random() * 9000) + 1000;
    this.username = localStorage.getItem('userID');
    this.masterForm = this.mformBuilder.group({
      orderNo: ['', Validators.required],
      assetName: ['', Validators.required],
      assetType: ['', Validators.required],
      vendorName: ['', Validators.required],
      manuYear: ['', Validators.required],
      purDate: ['', Validators.required],
      warranty: ['', Validators.required],
      wFrom: ['', Validators.required],
      wTo: ['', Validators.required]
    });
  }
  get formControls() {
    return this.masterForm.controls;
  }
  clear() {
    this.order = "";
  }
  searchPurchase() {
    this.orderNo = this.masterForm.controls.orderNo.value;
    this.masterService.searchOrder(this.orderNo).subscribe(x => {
      x.forEach(element => {
        this.masterview.assetName = element["assetName"];
        this.masterview.vendorName = element["vendorName"];
        this.masterview.assetType = element["assetType"];
        this.masterview.purchaseQuantity = element["purchaseQuantity"];
        this.quantity = element["purchaseQuantity"];
        this.masterview.purchaseStatus = element["purchaseStatus"];
        console.log(this.masterview);
      });
      if (this.masterview.purchaseStatus == "Registered Internally") {
        this.order = "Order Available";
      }
      else {
        this.order = "Order Not Available";
      }
    });
  }
  warrantySelect() {
    this.warranty = this.masterForm.controls.warranty.value;
    console.log(this.warranty)
    if (this.warranty == "Y") {
      this.warranty = "Y";
    }
    else {
      this.warranty = "N";
    }
  }
  addMaster() {
    this.assetName = this.masterForm.controls.assetName.value;
    this.vendorName = this.masterForm.controls.vendorName.value;
    this.assetType = this.masterForm.controls.assetType.value;
    this.master.am_model = 'M' + this.num;
    this.master.am_myyear = this.masterForm.controls.manuYear.value;
    this.master.am_pdate = this.masterForm.controls.purDate.value;
    this.master.am_warranty = this.masterForm.controls.warranty.value;
    this.master.am_from = this.masterForm.controls.wFrom.value;
    this.master.am_to = this.masterForm.controls.wTo.value;
    this.masterService.addAssetMaster(this.orderNo, this.assetName, this.vendorName, this.assetType, this.quantity.toString(), this.master).subscribe(x => {
      this.toastr.success('Assets Added', 'Congrats')
      this.masterForm.reset();
    })
  }
  logOut() {
    this.authservice.logout();
    this.router.navigate(['login'])
  }
}
