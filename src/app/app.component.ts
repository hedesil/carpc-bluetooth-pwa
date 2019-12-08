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
  serverConnected: any;

  constructor() {

  }

  async onConnectButtonClick() {
    try {
      console.log('Requesting Bluetooth Device...');
      this.bluetoothDevice = await navigator.bluetooth.requestDevice({acceptAllDevices: true,
        optionalServices: ['00001101-0000-1000-8000-00805f9b34fb']});
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
      await this.connect(this.bluetoothDevice.gatt);
      await this.bluetoothDevice.gatt.getPrimaryService('00001101-0000-1000-8000-00805f9b34fb');
      console.log(await this.bluetoothDevice.gatt.getPrimaryService('00001101-0000-1000-8000-00805f9b34fb'))
    } catch (error) {
      console.log('Argh! ' + error);
    }
  }

  async connect(deviceGatt) {
    try {
      await deviceGatt.connect();
    } catch {
      console.log('Ha habido un error');
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
      this.deviceInfo = 'Te has desconectado del dispositivo.';
    }
  }

  show;

}
