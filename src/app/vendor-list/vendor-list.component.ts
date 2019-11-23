import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Vendor } from '../vendor';
import { VendorService } from '../vendor.service';
import { AssetService } from '../asset.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-vendor-list',
  templateUrl: './vendor-list.component.html',
  styleUrls: ['./vendor-list.component.scss']
})
export class VendorListComponent implements OnInit {
  title:string="Vendor Creation";
  vendors:Observable<Vendor[]>;
  username:string;
  constructor(private vendorservice:VendorService,private assetservice: AssetService, private toastr: ToastrService, private router: Router, private authservice: AuthService) { }

  ngOnInit() {
    this.username=localStorage.getItem('userID');//Afte login this gets the entered username/email
    this.vendors=this.vendorservice.getVendorList()
  }
}
