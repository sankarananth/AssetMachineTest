import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AssetGetComponent } from './asset-get/asset-get.component';
import { AssetAddComponent } from './asset-add/asset-add.component';
import { AssetEditComponent } from './asset-edit/asset-edit.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { VendorListComponent } from './vendor-list/vendor-list.component';
import { VendorAddComponent } from './vendor-add/vendor-add.component';
import { VendorEditComponent } from './vendor-edit/vendor-edit.component';
import { PurchaseListComponent } from './purchase-list/purchase-list.component';
import { PurchaseAddComponent } from './purchase-add/purchase-add.component';
import { PurchaseEditComponent } from './purchase-edit/purchase-edit.component';
import { MasterListComponent } from './master-list/master-list.component';
import { MasterAddComponent } from './master-add/master-add.component';
import { MasterEditComponent } from './master-edit/master-edit.component';
import { MasterStatusComponent } from './master-status/master-status.component';



const routes: Routes = [
  {path:'',pathMatch:'full',redirectTo:'login'},
  {path:'login',component:LoginComponent},
  {path:'assetlist',component:AssetGetComponent,canActivate:[AuthGuard]},
  {path:'assetadd',component:AssetAddComponent,canActivate:[AuthGuard]},
  {path:'assetedit/:id',component:AssetEditComponent,canActivate:[AuthGuard]},
  {path:'vendorlist',component:VendorListComponent,canActivate:[AuthGuard]},
  {path:'vendoradd',component:VendorAddComponent,canActivate:[AuthGuard]},
  {path:'vendoredit/:id',component:VendorEditComponent,canActivate:[AuthGuard]},
  {path:'purchaselist',component:PurchaseListComponent,canActivate:[AuthGuard]},
  {path:'purchaseadd',component:PurchaseAddComponent,canActivate:[AuthGuard]},
  {path:'purchaseedit/:id',component:PurchaseEditComponent,canActivate:[AuthGuard]},
  {path:'masterlist',component:MasterListComponent,canActivate:[AuthGuard]},
  {path:'masteradd',component:MasterAddComponent,canActivate:[AuthGuard]},
  {path:'masteredit/:id',component:MasterEditComponent,canActivate:[AuthGuard]},
  {path:'masterstatus',component:MasterStatusComponent,canActivate:[AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{
    onSameUrlNavigation:'reload'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
