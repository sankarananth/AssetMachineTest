import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AssetGetComponent } from './asset-get/asset-get.component';
import { AssetAddComponent } from './asset-add/asset-add.component';
import { AssetEditComponent } from './asset-edit/asset-edit.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth.guard';
import { UserComponent } from './user/user.component';
import { AuthService } from './auth.service';



const routes: Routes = [
  {path:'',pathMatch:'full',redirectTo:'login'},
  {path:'login',component:LoginComponent},
  {path:'user',component:UserComponent,canActivate:[AuthGuard]},
  {path:'assetlist',component:AssetGetComponent,canActivate:[AuthGuard]},
  {path:'assetadd',component:AssetAddComponent,canActivate:[AuthGuard]},
  {path:'assetedit/:id',component:AssetEditComponent,canActivate:[AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{
    onSameUrlNavigation:'reload'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
