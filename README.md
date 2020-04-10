# iot-sim [![NPM Package](https://img.shields.io/npm/v/iot-sim)](https://www.npmjs.com/package/iot-sim)

> Representational simulation of IoT devices. 

## About

This project creates simulated IoT devices and facilities. Realistic data is generated based on the type of device and time of day. IoT telemetry data can be handled by a custom user defined function. 

## Devices

* Energy Device
* Tank Device 
* Wind Device


## Device API

```javascript 
/**
 * Device
 *
 * @constructor
 * @param {String} dsn - device serial number.
 * @param {String} type  - type of device.
 * @param {String} connectionString  - connection parameter for Azure IoT hub.
 * @param {String} profile  - device signature.
 * @param {boolean} log  - True=print fancy output console/False=no output
 * @param {function} handler - User defined function to handle the telemetry data
 */
```

## Facility API

```javascript
/**
 * Facility
 *
 * Models the composition of IoT objects into a single IoT "Facility"
 *
 * @constructor
 * @param {string} name  - name of the facility.
 * @param {array} devices  - IoT devices in the facility.
 * @param {array} geolocation  - lat and lon of the facility.
 * @param {number} frequency - milliseconds between messages.
 */
```

### Usage

```javascript
import {TankDevice, WindDevice, EnergyDevice, Facility} from "iot-sim"

// Facility 1

// Tank Monitoring Device
const tank_iot_01 = new TankDevice({
    dsn: "tank_iot_01",
    type: "tank",
    profile: null,
    log: false,
    handler: console.log
});

// Wind Monitoring Device
const wind_iot_01 = new WindDevice({
    dsn: "wind_iot_01",
    type: "wind",
    profile: "profile1",
    log: false,
    handler: console.log
});

// Energy Monitoring Device
const energy_iot_01 = new EnergyDevice({
    dsn: "energy_iot_01",
    type: "energy",
    profile: "profile1",
    log: false,
    handler: console.log
});

const facility_01 = new Facility({
    name: "facility_01",
    devices: [energy_iot_01, wind_iot_01, tank_iot_01],
    geolocation: {
        lat: 51.0447,
        lon: 114.0719
    },
    frequency: 10000, 
});

facility_01.setupFacility();
facility_01.putOnline();
```


## Output data 

```javascript
{
  data: { watts: 171.189 },
  timestamp: 1586550588454,
  id: 'a855447a-b488-475b-bb2c-be80cabba8ca',
  _id: 'a855447a-b488-475b-bb2c-be80cabba8ca',
  dsn: 'energy_iot_01',
  geolocation: { lat: 51.0447, lon: 114.0719 },
  facility: 'facility_01',
  type: 'energy'
}
{
  data: { mph: 20.995, direction: 'S' },
  timestamp: 1586550588459,
  id: '6042d595-b93f-4ff8-884a-38d860fa73c4',
  _id: '6042d595-b93f-4ff8-884a-38d860fa73c4',
  dsn: 'wind_iot_01',
  geolocation: { lat: 51.0447, lon: 114.0719 },
  facility: 'facility_01',
  type: 'wind'
}
{
  data: { liters: 98.404, pH: 6.079 },
  timestamp: 1586550588460,
  id: 'd2befdfa-b2d9-4b9a-8970-523c486346b1',
  _id: 'd2befdfa-b2d9-4b9a-8970-523c486346b1',
  dsn: 'tank_iot_01',
  geolocation: { lat: 51.0447, lon: 114.0719 },
  facility: 'facility_01',
  type: 'tank'
}
```

## Author

* **Andrew Moss** - *Creator* - [agmoss](https://github.com/agmoss)