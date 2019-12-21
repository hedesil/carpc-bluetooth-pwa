import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})


export class AppComponent {
  title = 'CarPC';
  deviceInfo: string;
  connectStatus: string;
  bluetoothDevice: BluetoothDevice;
  server: BluetoothRemoteGATTServer;

  constructor() {

  }

  async onConnectButtonClick() {
    try {
      console.log('Requesting Bluetooth Device...');
      this.bluetoothDevice = await navigator.bluetooth.requestDevice({
        acceptAllDevices: true,
        optionalServices: ['00001101-0000-1000-8000-00805f9b34fb']
      });
      const deviceInfo: any = {
        name: this.bluetoothDevice ? this.bluetoothDevice.name : this.bluetoothDevice.id,
        id: this.bluetoothDevice.id
      };
      if (deviceInfo.name !== null && this.bluetoothDevice.name !== undefined) {
        this.deviceInfo = deviceInfo.name;
      } else {
        this.deviceInfo = deviceInfo.id;
        console.log(this.bluetoothDevice);
      }
      this.server = await this.bluetoothDevice.gatt.connect();
      console.log('Connected to GATT Server...');

    } catch (error) {
      console.log('Argh! ' + error);
    }
  }


  onDisconnectButtonClick() {
    if (!this.bluetoothDevice) {
      return;
    }
    console.log('Disconnecting from Bluetooth Device...');
    if (this.bluetoothDevice.gatt.connected) {
      this.bluetoothDevice.gatt.disconnect();
    } else {
      console.log('> Bluetooth Device is already disconnected');
      this.deviceInfo = null;
    }
  }


  async getGATTServices() {
    try {
      const primaryServices = await this.server.getPrimaryServices();
    } catch (e) {
      console.log(`Wooops, an error occurred: ${e}`);
    }
  }
}
