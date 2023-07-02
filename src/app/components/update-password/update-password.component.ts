import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {RestApiService} from "../../services/restapi/rest-api.service";
import {Router} from "@angular/router";
import {UpdatePasswordModel} from "../../models/UpdatePasswordModel";

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.css']
})
export class UpdatePasswordComponent {
  updateFormGroup!: FormGroup;

  constructor(private fb: FormBuilder, private restApiService: RestApiService, private router: Router) { }

  ngOnInit(): void {
    this.updateFormGroup = this.fb.group( {
      username : this.fb.control(null, [Validators.required, Validators.minLength(4), Validators.maxLength(64)]),
      code : this.fb.control(null, [Validators.required, Validators.minLength(2), Validators.maxLength(64)]),
      password : this.fb.control( null, [Validators.required, Validators.minLength(4), Validators.maxLength(64)])
    });
  }


  handleUpdate() {
    let model: UpdatePasswordModel = new UpdatePasswordModel();
    model.code = this.updateFormGroup.value.code;
    model.username = this.updateFormGroup.value.username;
    model.newPassword = this.updateFormGroup.value.password;

    this.restApiService.changePassword(model).subscribe(
      (data: UpdatePasswordModel) : void => {
        alert(data.username);
        this.router.navigateByUrl("login").then();
      }
    );
  }
}
