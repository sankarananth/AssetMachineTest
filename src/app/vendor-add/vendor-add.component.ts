import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { AssetService } from '../asset.service';
import { Observable } from 'rxjs';
import { Assettype } from '../assettype';
import { Vendor } from '../vendor';
import { VendorService } from '../vendor.service';


@Component({
  selector: 'app-vendor-add',
  templateUrl: './vendor-add.component.html',
  styleUrls: ['./vendor-add.component.scss']
})
export class VendorAddComponent implements OnInit {
  vendorForm: FormGroup;
  title: string = "Vendor Creation";
  assettypes: Observable<Assettype[]>;
  username: string;
  vendor: Vendor = new Vendor;
  datemessage: string;
  message:string;
  constructor(private vendorservice: VendorService, private assetservice: AssetService, private vFormBuilder: FormBuilder, private toastr: ToastrService, private router: Router, private authservice: AuthService) { }

  ngOnInit() {
    this.assettypes = this.assetservice.getAssettypes();//Populate the dropdown using this function
    this.vendorForm = this.vFormBuilder.group({
      vendorname: ['',Validators.compose([Validators.required,Validators.pattern('^([a-zA-Z -]+)$')])],
      vendortype: ['Supplier', Validators.required],
      vassettype: ['', Validators.required],
      vfromdate: ['', Validators.required],
      vtodate: ['', Validators.required],
      vaddress: ['', Validators.required]
    },{validator:this.validateDates('vfromdate','vtodate')});
    this.username = localStorage.getItem('userID');//Afte login this gets the entered username/email
  }
  get formControls() {
    return this.vendorForm.controls;
  }
  addVendor() {
    this.vendor.vd_name = this.vendorForm.controls.vendorname.value;
    this.vendor.vd_type = this.vendorForm.controls.vendortype.value;
    this.vendor.vd_type_id = this.vendorForm.controls.vassettype.value;
    this.vendor.vd_from = this.vendorForm.controls.vfromdate.value;
    this.vendor.vd_to = this.vendorForm.controls.vtodate.value;
    this.vendor.vd_addr = this.vendorForm.controls.vaddress.value;
    console.log(this.vendor);
    this.vendorservice.checkVendor(this.vendor).subscribe(x=>{
      if(x==0)
      {
        this.vendorservice.addVendor(this.vendor).subscribe(x => {
          this.toastr.success('Vendor Added', 'Good Work!')
          this.vendorForm.reset();
        });
      }
      else
      {
        this.message="This vendor already exists";
      }
    });
  }
  clearMessage()//function to clear the message on textchange event of the textbox 
 {
   this.message=""
 }
  validateDates(from:string,to:string) {
    return (vendorForm: FormGroup): {[key: string]: any} => {
      let f = vendorForm.controls['vfromdate'];
      let t = vendorForm.controls['vtodate'];
      if (f.value > t.value) {
        return {
          dates: "To date cannot be before from date"
        };
      }
      return {};
     }
   }
  logOut() //Logout and re-route to login component
  {
    this.authservice.logout();
    this.router.navigate(['login']);
  }
}
