import { Component, OnInit } from '@angular/core';
import { NavParams } from 'ionic-angular';
import { GoogleServiceProvider } from "../../providers/google-service";

declare const ntc: any;

@Component({
  selector: 'page-result',
  templateUrl: 'result.html',
  providers: [GoogleServiceProvider]
})
export class ResultPage implements OnInit {

  private showSpinner: boolean = true;
  private colorMatch: any;


  constructor(private navParams: NavParams, private googleServiceProvider: GoogleServiceProvider) {}

  ngOnInit() {
    try {

      const imageData: any = this.navParams.get('imageData');

      this.googleServiceProvider.postImageData(imageData).then(response => {
        const dominantColor: any = response['responses'][0]['imagePropertiesAnnotation']['dominantColors']['colors'][0]['color'];
        console.log(dominantColor);
        const red: any = dominantColor['red'];
        const green: any = dominantColor['green'];
        const blue: any = dominantColor['blue'];

        const rgbHex = require('rgb-hex');
        const hex: any = rgbHex(red, green, blue);
        this.colorMatch = ntc.name('#' + hex);
        console.log(this.colorMatch);
      });


      //this.colorMatch = ["#D5BCA9", "45 DARK BEIGE", false]; // Hardcoded
    }
    catch (error) {
      console.log('ERROR: ' + error);
    }
  }

}
