import { Component, OnInit } from '@angular/core';
import { MasterService } from '../master.service';
import { Observable } from 'rxjs';
import { Master } from '../master';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-master-list',
  templateUrl: './master-list.component.html',
  styleUrls: ['./master-list.component.scss']
})
export class MasterListComponent implements OnInit {

  masters: Observable<Master[]>
  title: string = "Asset Management System";
  username: string;
  constructor(private masterService: MasterService, private authservice: AuthService, private router: Router) { }

  ngOnInit() {
    this.username = localStorage.getItem('userID');
    this.masters = this.masterService.getMasterList();
  }
  logOut() {
    this.authservice.logout();
    this.router.navigate(['login'])
  }

}
