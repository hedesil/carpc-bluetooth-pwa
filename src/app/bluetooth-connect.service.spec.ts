import { TestBed } from '@angular/core/testing';

import { BluetoothConnectService } from './bluetooth-connect.service';

describe('BluetoothConnectService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BluetoothConnectService = TestBed.get(BluetoothConnectService);
    expect(service).toBeTruthy();
  });
});
