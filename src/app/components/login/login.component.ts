import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthService} from "../../services/security/auth.service";
import {User} from "../../models/user.model";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  loginFormGroup!: FormGroup;
  errorFlag:number = 0;

  constructor(private fb: FormBuilder, private securityService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.loginFormGroup = this.fb.group( {
      username : this.fb.control(null, [Validators.required, Validators.minLength(4), Validators.maxLength(64)]),
      password : this.fb.control( null, [Validators.required, Validators.minLength(4), Validators.maxLength(64)])
    });
  }

  handleLogin() {
    let user = new User();
    user.password = this.loginFormGroup.value.password;
    user.username = this.loginFormGroup.value.username;
    this.securityService.login(user).subscribe({
      next: (data) => {
        let jwToken = data.headers.get('Authorization')!;
        this.securityService.saveToken(jwToken);
        this.router.navigate(['/']).then(() => {});
      },
      error: (err: any) => {
        console.log(err);
        this.errorFlag = 1;
      }
    });
  }

  gotoForgetPasswordComponent() {
    this.router.navigateByUrl("forget-password").then();
  }

  gotoForgetInscriptionComponent() {
    this.router.navigateByUrl("inscription").then();
  }

}
