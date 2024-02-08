const bleno = require('./index');

const BlenoPrimaryService = bleno.PrimaryService;
const BlenoCharacteristic = bleno.Characteristic;
const BlenoDescriptor = bleno.Descriptor;

console.log('bleno');
console.log(bleno.PrimaryService);

class StaticReadOnlyCharacteristic extends BlenoCharacteristic {
  constructor() {
    super({
      uuid: 'ffffffffffffffffffffffffffffff11',
      properties: ['read'],
      value: Buffer.from('Data from bluetooth !!'),
      descriptors: [
        new BlenoDescriptor({
          uuid: '2901',
          value: 'user description'
        })
      ]
    });
  }
}

class SampleService extends BlenoPrimaryService {
  constructor() {
    super({
      uuid: 'fffffffffffffffffffffffffffffff0',
      characteristics: [
        new StaticReadOnlyCharacteristic(),
      ]
    });
  }
}

bleno.on('stateChange', function(state) {
  console.log('on -> stateChange: ' + state + ', address = ' + bleno.address);

  if (state === 'poweredOn') {
    bleno.startAdvertising('Bluetooth Demo', ['fffffffffffffffffffffffffffffff0']);
  } else {
    bleno.stopAdvertising();
  }
});

// Linux only events /////////////////
bleno.on('accept', function(clientAddress) {
  console.log('on -> accept, client: ' + clientAddress);

  bleno.updateRssi();
});

bleno.on('disconnect', function(clientAddress) {
  console.log('on -> disconnect, client: ' + clientAddress);
});

bleno.on('rssiUpdate', function(rssi) {
  console.log('on -> rssiUpdate: ' + rssi);
});
//////////////////////////////////////

bleno.on('mtuChange', function(mtu) {
  console.log('on -> mtuChange: ' + mtu);
});

bleno.on('advertisingStart', function(error) {
  console.log('on -> advertisingStart: ' + (error ? 'error ' + error : 'success'));

  if (!error) {
    bleno.setServices([
      new SampleService()
    ]);
  }
});

bleno.on('advertisingStop', function() {
  console.log('on -> advertisingStop');
});

bleno.on('servicesSet', function(error) {
  console.log('on -> servicesSet: ' + (error ? 'error ' + error : 'success'));
});
