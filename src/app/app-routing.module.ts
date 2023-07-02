import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./components/login/login.component";
import {InscriptionComponent} from "./components/inscription/inscription.component";
import {ProfileComponent} from "./components/profile/profile.component";
import {UploadImageComponent} from "./components/upload-image/upload-image.component";
import {DashboardComponent} from "./components/dashboard/dashboard.component";
import {ForgetPasswordComponent} from "./components/forget-password/forget-password.component";
import {UpdatePasswordComponent} from "./components/update-password/update-password.component";
import {AppGuard} from "./components/guard/app.guard";

const routes: Routes = [
  {path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  {path: 'login', component: LoginComponent},
  {path: 'inscription', component: InscriptionComponent},
  {path: 'profile', component: ProfileComponent},
  {path: 'upload-image', component: UploadImageComponent},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'forget-password', component: ForgetPasswordComponent},
  {path: 'update-password', component: UpdatePasswordComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
