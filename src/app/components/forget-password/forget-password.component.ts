import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {RestApiService} from "../../services/restapi/rest-api.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent implements OnInit{
  pwdFormGroup!: FormGroup;

  constructor(private fb: FormBuilder, private restApiService: RestApiService, private router: Router) { }

  ngOnInit(): void {
    this.pwdFormGroup = this.fb.group( {
      email : this.fb.control(null, [Validators.email, Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@esprit.tn$')])
    });
  }

  handleSend() {
    let email = this.pwdFormGroup.value.email;
    this.restApiService.send(email).subscribe(
      (data: string) : void => {
        alert(data);
        this.router.navigateByUrl("update-password").then();
      }
    );
  }
}
