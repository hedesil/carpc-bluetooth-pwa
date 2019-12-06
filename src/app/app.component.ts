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
  bluetoothDevice: any;
  serverConnected: any;

  constructor() {

  }

  async onConnectButtonClick() {
    try {
      console.log('Requesting Bluetooth Device...');
      this.bluetoothDevice = await navigator.bluetooth.requestDevice({acceptAllDevices: true});

      const deviceInfo: any = {
        name: this.bluetoothDevice ? this.bluetoothDevice.name : this.bluetoothDevice.id,
        id: this.bluetoothDevice.id
      };

      if (deviceInfo.name !== null && this.bluetoothDevice.name !== undefined) {
        this.deviceInfo = 'Has encontrado ' + deviceInfo.name;
      } else {
        this.deviceInfo = 'Has encontrado ' + deviceInfo.id;
        console.log(this.bluetoothDevice);
      }

      console.log('Connecting to GATT Server...');
      this.serverConnected = await this.connect(this.bluetoothDevice.gatt);
      this.connectStatus = JSON.stringify(this.serverConnected, null, 4);

    } catch (error) {
      console.log('Argh! ' + error);
    }
  }

  async connect(deviceGatt) {
    await deviceGatt.connect();
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
      this.deviceInfo = 'Te has desconectado del dispositivo.'
    }
  }

}
