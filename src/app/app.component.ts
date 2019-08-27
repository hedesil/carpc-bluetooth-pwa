import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})


export class AppComponent {
  title = 'CarPC';
  Message: string;

  constructor() {

  }

  async onButtonClick() {
    try {
      console.log('Requesting Bluetooth Device...');
      const device = await navigator.bluetooth.requestDevice({
        acceptAllDevices: true
      });

      const deviceInfo: any = {
        name: device ? device.name : device.id,
        id: device.id
      };

      if (deviceInfo.name !== null && device.name !== undefined) {
        this.Message = 'Has encontrado ' + deviceInfo.name;
      } else {
        this.Message = 'Has encontrado ' + deviceInfo.id;
        console.log(device);
      }

      console.log('Connecting to GATT Server...');
      const server = await device.gatt.connect();

      console.log('Getting Battery Service...');
      const service = await server.getPrimaryService('battery_service');

      console.log('Getting Battery Level Characteristic...');
      const characteristic = await service.getCharacteristic('battery_level');

      console.log('Reading Battery Level...');
      const value = await characteristic.readValue();

      console.log('> Battery Level is ' + value.getUint8(0) + '%');
    } catch (error) {
      console.log('Argh! ' + error);
    }
  }

}
