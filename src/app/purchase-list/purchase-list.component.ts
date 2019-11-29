import { Component, OnInit } from '@angular/core';
import { PurchaseService } from '../purchase.service';
import { Observable } from 'rxjs';
import { Purchase } from '../purchase';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-purchase-list',
  templateUrl: './purchase-list.component.html',
  styleUrls: ['./purchase-list.component.scss']
})
export class PurchaseListComponent implements OnInit {

  isenabled = false;
  purchases: Observable<Purchase[]>;
  title: string = "Asset Management System";
  public popoverTitle: string = 'Delete';
  public popoverMessage: string = 'Do you want to cancel this Order?';
  public confirmClicked: boolean = false;
  public cancelClicked: boolean = false;
  constructor(private purchaseService: PurchaseService, private authservice: AuthService, private router: Router, private toastr: ToastrService) { }
  username: string;
  ngOnInit() {
    this.purchases = this.purchaseService.getPurchaseList();
    this.username = localStorage.getItem('userID');
  }
  logOut() {
    this.authservice.logout();
    this.router.navigate(['login']);
  }
  DeleteOrder(id: number) {
    this.purchaseService.deletePurchase(id).subscribe(x => {
      this.toastr.error('Order Cancelled', 'OK!')
      this.ngOnInit();
    })
  }

}
