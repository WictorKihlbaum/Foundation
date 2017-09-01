import { Injectable } from '@angular/core';
import { Http, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class GoogleServiceProvider {

  private visionUrl: string = 'https://vision.googleapis.com/v1/images:annotate?';
  private apiKey: string = 'AIzaSyCCVQyckp7fszzDNu-ziMNVbnEpojXSfCM';


  constructor(public http: Http) {}

  postImageData(imageData: any) {
    return new Promise((resolve, reject) => {

      const headers: any = new Headers();
      headers.append('Accept', 'application/json');
      headers.append('Content-Type', 'application/json');
      const options: any = new RequestOptions({ headers: headers });

      const body: string = `{
        "requests":[
          {
            "image":{
              "content":"${imageData}"
            },
            "features":[
              {
                "type":"IMAGE_PROPERTIES"
              }
            ]
          }
        ]
      }`;

      const params: any = JSON.parse(body);
      const url: string = `${this.visionUrl}key=${this.apiKey}`;

      this.http.post(url, params, options)
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        }, error => {
          console.log('ERROR: ' + error);
          reject();
        });

    });
  }

}
