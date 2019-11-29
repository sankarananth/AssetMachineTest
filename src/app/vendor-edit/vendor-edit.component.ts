import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { VendorService } from '../vendor.service';
import { AssetService } from '../asset.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Vendor } from '../vendor';
import { Observable } from 'rxjs';
import { Assettype } from '../assettype';

@Component({
  selector: 'app-vendor-edit',
  templateUrl: './vendor-edit.component.html',
  styleUrls: ['./vendor-edit.component.scss']
})
export class VendorEditComponent implements OnInit {
  vendorForm: FormGroup;
  title: string = "Asset Management System";
  assettypes: Observable<Assettype[]>;
  username: string;
  vendor: Vendor = new Vendor;
  id: number;
  message: string;
  constructor(private route: ActivatedRoute, private vendorservice: VendorService, private assetservice: AssetService, private vFormBuilder: FormBuilder, private toastr: ToastrService, private router: Router, private authservice: AuthService) { }

  ngOnInit() {
    this.vendorForm = this.vFormBuilder.group({
      vendorname: ['', Validators.compose([Validators.required, Validators.pattern('^([a-zA-Z -]+)$')])],
      vendortype: ['Supplier', Validators.required],
      vassettype: ['', Validators.required],
      vfromdate: ['', Validators.required],
      vtodate: ['', Validators.required],
      vaddress: ['', Validators.required]
    }, { validator: this.validateDates('vfromdate', 'vtodate') });
    this.assettypes = this.assetservice.getAssettypes(); //Populate the dropdown using this function
    this.id = this.route.snapshot.params["id"];
    this.vendorservice.getVendor(this.id).subscribe(x => {
      this.vendor = x;
      console.log(this.vendor)
      this.vendorForm.controls['vendorId'].setValue(this.vendor.vd_id);
      this.vendorForm.controls['vendorname'].setValue(this.vendor.vd_name);
      this.vendorForm.controls['vendortype'].setValue(this.vendor.vd_type);
      this.vendorForm.controls['vassettype'].setValue(this.vendor.vd_type_id);
      this.vendorForm.controls['vfromdate'].setValue(this.vendor.vFrom);
      this.vendorForm.controls['vtodate'].setValue(this.vendor.vTo);
      this.vendorForm.controls['vaddress'].setValue(this.vendor.vd_addr);
    });
    this.username = localStorage.getItem('userID'); //Afte login this gets the entered username/email
  }
  get formControls() {
    return this.vendorForm.controls;
  }
  validateDates(from: string, to: string) {
    return (vendorForm: FormGroup): { [key: string]: any } => {
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
  updateVendor() {
    this.vendor.vd_id = this.vendorForm.controls['vendorId'].value;
    this.vendor.vd_name = this.vendorForm.controls['vendorname'].value;
    this.vendor.vd_type = this.vendorForm.controls['vendortype'].value;
    this.vendor.vd_type_id = this.vendorForm.controls['vassettype'].value;
    this.vendor.vd_from = this.vendorForm.controls['vfromdate'].value;
    this.vendor.vd_to = this.vendorForm.controls['vtodate'].value;
    this.vendor.vd_addr = this.vendorForm.controls['vaddress'].value;
    console.log(this.vendor);
    this.vendorservice.checkVendor(this.vendor).subscribe(x => {
      if (x == 0) {
        this.vendorservice.updateVendor(this.id, this.vendor).subscribe(x => {
          this.toastr.success('Update Successfull', 'Congrats Buddy')
          this.vendorForm.reset();
        });
      }
      else {
        this.message = "This vendor already exists";
      }
    })
  }
  clearMessage()//function to clear the message on textchange event of the textbox 
  {
    this.message = ""
  }
  logOut() //Logout and re-route to login component
  {
    this.authservice.logout();
    this.router.navigate(['login']);
  }
}
