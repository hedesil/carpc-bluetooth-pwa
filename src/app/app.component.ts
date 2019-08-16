import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})


export class AppComponent {
  title = 'carpcOBD';
  errorMessage: string;
  constructor() {

  }

  public connect() {
    this.errorMessage = 'Esperando error...';
    navigator.bluetooth.requestDevice({acceptAllDevices: true})
      .then(device => {
        let deviceInfo: any;
        deviceInfo.name = device.name;
        deviceInfo.id = device.id;
        console.log(device);
        console.log('User paired with device name:', device.name,
          'id:', device.id);
      })
      .catch(error => {
        let errMes = error.message;
        this.errorMessage = errMes;
        console.log(errMes)
      });
  }
}
