import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {RestApiService} from "../../services/restapi/rest-api.service";
import {User} from "../../models/user.model";
import {InscriptionModel} from "../../models/inscription.model";

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.css']
})
export class InscriptionComponent implements OnInit{
  inscriptionFormGroup!: FormGroup;
  errorFlag:number = 0;

  constructor(private fb: FormBuilder, private restApiService: RestApiService, private router: Router) { }

  ngOnInit(): void {
    this.inscriptionFormGroup = this.fb.group( {
      email : this.fb.control(null, [Validators.email, Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@esprit.tn$')]),
      username : this.fb.control(null, [Validators.required, Validators.minLength(4), Validators.maxLength(64)]),
      firstname : this.fb.control(null, [Validators.required, Validators.minLength(2), Validators.maxLength(64)]),
      name : this.fb.control(null, [Validators.required, Validators.minLength(4), Validators.maxLength(64)]),
      password : this.fb.control( null, [Validators.required, Validators.minLength(4), Validators.maxLength(64)])
    });
  }

  handleInscription() {
    let form = new InscriptionModel();
    form.password = this.inscriptionFormGroup.value.password;
    form.username = this.inscriptionFormGroup.value.username;
    form.email = this.inscriptionFormGroup.value.email;
    form.name = this.inscriptionFormGroup.value.name;
    form.firstname = this.inscriptionFormGroup.value.firstname;

    this.restApiService.inscription(form).subscribe({
      next: (data) => {
        console.log(data.userId);
        this.router.navigate(['/login']).then(() => {});
      },
      error: (err: any) => {
        console.log(err);
        this.errorFlag = 1;
      }
    });
  }


}
