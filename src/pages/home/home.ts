import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Camera, CameraOptions } from "@ionic-native/camera";
import { ResultPage } from "../result/result";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(private navCtrl: NavController, private camera: Camera) {}
  
    onTakePhoto(source: number) {
      const options: CameraOptions = {
        quality: 100,
        destinationType: this.camera.DestinationType.DATA_URL,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE,
        targetWidth: 480,
        targetHeight: 640,
        sourceType: source,
        allowEdit: true
      };
  
      this.camera.getPicture(options).then(imageData => {
        this.navCtrl.push(ResultPage, { imageData: imageData });
      }, (err) => {
        console.log(err);
      });
    }

}
