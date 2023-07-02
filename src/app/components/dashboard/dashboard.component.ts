import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../services/security/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{

  constructor(private authService: AuthService, private router: Router) {}
  ngOnInit(): void {
    this.security();
  }

  security(){
    if(this.authService.isTokenExpired()){
      this.authService.logout();
    }
    if(!this.authService.isloggedIn){
      this.authService.logout();
    }
  }

}
