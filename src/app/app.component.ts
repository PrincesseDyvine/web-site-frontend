import {Component, OnInit} from '@angular/core';
import {AuthService} from "./services/security/auth.service";
import {Router} from "@angular/router";
import {RestApiService} from "./services/restapi/rest-api.service";
import {PictureModel} from "./models/picture.model";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'dashboard';

  imageProfile!: string;

  constructor (public authService: AuthService, private router: Router, private restApiService: RestApiService) {
  }

  ngOnInit(): void {
    this.authService.loadToken();
    this.loadImage();
  }


  onLogout() {
    this.authService.logout();
  }

  onLogin() {
    this.router.navigateByUrl("login").then();
  }

  loadImage(){
    this.checkIfSessionExpired();
    this.restApiService.getPicture().subscribe((img: PictureModel) => {
      this.imageProfile = 'data:' + img.type + ';base64,' + img.image;
    });
  }

  checkIfSessionExpired(){
    if(this.authService.isTokenExpired()){
      this.authService.logout();
    }
  }


}
