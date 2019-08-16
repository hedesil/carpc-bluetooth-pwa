import { Component, OnInit } from '@angular/core';
import { BluetoothCore } from '@manekinekko/angular-web-bluetooth';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [BluetoothCore]
})


export class AppComponent {
  title = 'carpcOBD';
  public ble: BluetoothCore;
  OnInit() {

  }

  getDevice() {
    // you can get ask for the device observable in order to be notified when the device has (dis)connected
    return this.ble.getDevice$();
  }

}
