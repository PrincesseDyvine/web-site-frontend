import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {RestApiService} from "../../services/restapi/rest-api.service";

@Component({
  selector: 'app-upload-image',
  templateUrl: './upload-image.component.html',
  styleUrls: ['./upload-image.component.css']
})
export class UploadImageComponent implements OnInit{
  uploadedImage!: File;
  imagePath: any;

  constructor(private router: Router, private apiRestService: RestApiService) {
  }


  ngOnInit(): void {
  }

  onImageUpload(event: any) {
    this.uploadedImage = event.target.files[0];
    var reader = new FileReader();
    reader.readAsDataURL(this.uploadedImage);
    reader.onload = (_event) => { this.imagePath = reader.result; }
  }

  save() {
    this.apiRestService.uploadImage(this.uploadedImage, this.uploadedImage.name)
      .subscribe();
    this.router.navigateByUrl("profile").then();
  }
}
