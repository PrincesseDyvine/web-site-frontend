import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {User} from "../../models/user.model";
import {RestApiService} from "../../services/restapi/rest-api.service";
import {Router} from "@angular/router";
import {AuthService} from "../../services/security/auth.service";
import {PictureModel} from "../../models/picture.model";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit{
  user!: Observable<User>;
  errorMessage!: string;
  imageStr!: string;
  constructor(private restApiService: RestApiService,
              private router: Router, private authService: AuthService) {}
  ngOnInit(): void {
    this.checkIfSessionExpired();
    this.getUser();
    this.loadImage();
  }

  getUser(){
    this.checkIfSessionExpired();
    this.user = this.restApiService.getProfile();
  }

  loadImage(){
    this.checkIfSessionExpired();
    this.restApiService.getPicture().subscribe((img: PictureModel) => {
      this.imageStr = 'data:' + img.type + ';base64,' + img.image;
    });
  }

  uploadImage() {
    this.checkIfSessionExpired();
    this.router.navigateByUrl("upload-image").then();
  }

  checkIfSessionExpired(){
    if(this.authService.isTokenExpired()){
      this.authService.logout();
    }
  }
}
