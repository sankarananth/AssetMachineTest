import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { MasterService } from '../master.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Master } from '../master';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-master-edit',
  templateUrl: './master-edit.component.html',
  styleUrls: ['./master-edit.component.scss']
})
export class MasterEditComponent implements OnInit {

  title: string = "Asset Management System";
  username: string;
  masterForm: FormGroup;
  id: number;
  warranty: string;
  todate: Date;
  master: Master = new Master;
  constructor(private mformBuilder: FormBuilder, private masterService: MasterService, private toastr: ToastrService, private route: ActivatedRoute, private authservice: AuthService, private router: Router) { }

  ngOnInit() {
    this.id = this.route.snapshot.params["id"];
    this.username = localStorage.getItem('userID');
    this.masterForm = this.mformBuilder.group({
      assetId: ['', Validators.required],
      assetName: ['', Validators.required],
      assetType: ['', Validators.required],
      vendorName: ['', Validators.required],
      manuYear: ['', Validators.required],
      modelNo: ['', Validators.required],
      serialNo: ['', Validators.required],
      purDate: ['', Validators.required],
      warranty: ['', Validators.required],
      wFrom: ['', Validators.required],
      wTo: ['', Validators.required]
    });
    this.masterService.getMaster(this.id).subscribe(x => {
      this.master = x;
      console.log(this.master);
    });
  }
  get formControls() {
    return this.masterForm.controls;
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
  updateMaster() {
    this.id = this.masterForm.controls.assetId.value;
    this.master.am_id = this.masterForm.controls.assetId.value;
    this.master.am_make_id = this.masterForm.controls.vendorName.value;
    this.master.am_ad_id = this.masterForm.controls.assetName.value;
    this.master.am_atype_id = this.masterForm.controls.assetType.value;
    this.master.am_myyear = this.masterForm.controls.manuYear.value;
    this.master.am_pdate = this.masterForm.controls.purDate.value;
    this.master.am_warranty = this.masterForm.controls.warranty.value;
    this.master.am_from = this.masterForm.controls.wFrom.value;
    this.master.am_to = this.masterForm.controls.wTo.value;
    this.masterService.updateMaster(this.id, this.master).subscribe(x => {
      this.toastr.success('Well Done', 'Updated');
      this.masterForm.reset();
    });
  }
  logOut() {
    this.authservice.logout();
    this.router.navigate(['login'])
  }
}
