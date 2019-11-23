import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from "@angular/forms";
import { Loginuser } from '../loginuser';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  isSubmitted = false;
  loginuser: Loginuser;
  message: string;
  user: Observable<Loginuser[]>;
  users: Loginuser = new Loginuser();

  constructor(private authservice: AuthService, private router: Router, private formBuilder: FormBuilder,private toastr:ToastrService) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['',Validators.required]
    });
  }
  get formControls() {
    return this.loginForm.controls;
  }

  login() {
    this.isSubmitted = true;
    
    if (this.loginForm.invalid) {
      return;
    }
   this.loginuser=this.loginForm.value;
    console.log(this.loginuser);
    this.authservice.login(this.loginuser)
    .subscribe(x => {
      x.forEach(element => {
        this.users.utype = element["utype"];
      })
      if (this.users.utype == "Admin") {
        this.router.navigate(['assetlist']);
        this.toastr.info('Welcome Admin')
      }
      else if(this.users.utype == "Purchase Manager") 
      {
        this.router.navigate(['user']);
        this.toastr.info('Welcome User')
      }
      else{
        this.message="Invalid Username or password"
      }
    },(error) =>{console.log(error)}
    );
  }
}
