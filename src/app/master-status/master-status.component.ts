import { Component, OnInit } from '@angular/core';
import { PurchaseService } from '../purchase.service';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { Purchase } from '../purchase';

@Component({
  selector: 'app-master-status',
  templateUrl: './master-status.component.html',
  styleUrls: ['./master-status.component.scss']
})
export class MasterStatusComponent implements OnInit {

  purchases: Observable<Purchase[]>;
  title: string = "Asset Management System";
  username: string;
  constructor(private purchaseService: PurchaseService, private authservice: AuthService, private router: Router, private toastr: ToastrService) { }

  ngOnInit() {
    this.purchases = this.purchaseService.getPurchaseList();
    this.username = localStorage.getItem('userID');
  }
  logOut() {
    this.authservice.logout();
    this.router.navigate(['login'])
  }
}
