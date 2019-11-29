import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { AssetAddComponent } from './asset-add/asset-add.component';
import { AssetGetComponent } from './asset-get/asset-get.component';
import { AssetEditComponent } from './asset-edit/asset-edit.component';
import { HttpClientModule } from "@angular/common/http";
import { FormsModule } from "@angular/forms";
import { ReactiveFormsModule } from "@angular/forms";
import { ConfirmationPopoverModule } from 'angular-confirmation-popover';
import { LoginComponent } from './login/login.component';
import { VendorAddComponent } from './vendor-add/vendor-add.component';
import { VendorListComponent } from './vendor-list/vendor-list.component';
import { VendorEditComponent } from './vendor-edit/vendor-edit.component';
import { PurchaseAddComponent } from './purchase-add/purchase-add.component';
import { PurchaseEditComponent } from './purchase-edit/purchase-edit.component';
import { PurchaseListComponent } from './purchase-list/purchase-list.component';
import { MasterAddComponent } from './master-add/master-add.component';
import { MasterEditComponent } from './master-edit/master-edit.component';
import { MasterListComponent } from './master-list/master-list.component';
import { MasterStatusComponent } from './master-status/master-status.component';

@NgModule({
  declarations: [
    AppComponent,
    AssetAddComponent,
    AssetGetComponent,
    AssetEditComponent,
    LoginComponent,
    VendorAddComponent,
    VendorListComponent,
    VendorEditComponent,
    PurchaseAddComponent,
    PurchaseEditComponent,
    PurchaseListComponent,
    MasterAddComponent,
    MasterEditComponent,
    MasterListComponent,
    MasterStatusComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ConfirmationPopoverModule.forRoot({
      confirmButtonType: 'danger' 
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
