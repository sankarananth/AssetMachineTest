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
  title: string = "Asset Management System";
  vendors: Observable<Vendor[]>;
  username: string;
  public popoverTitle: string = 'Delete';
  public popoverMessage: string = 'Do you want to delete this Vendor?';
  public confirmClicked: boolean = false;
  public cancelClicked: boolean = false;
  constructor(private vendorservice: VendorService, private router: Router, private authservice: AuthService, private toastr: ToastrService) { }

  ngOnInit() {
    this.username = localStorage.getItem('userID');//Afte login this gets the entered username/email
    this.vendors = this.vendorservice.getVendorList()
  }
  logOut() //Logout and re-route to login component
  {
    this.authservice.logout();
    this.router.navigate(['login']);
  }
  deleteVendor(id: number) {
    this.vendorservice.deleteV(id).subscribe(x => {
      this.toastr.error('Deletion Successfull', 'Deleted');
      this.ngOnInit();
    });
  }
}
