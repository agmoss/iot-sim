# iot-simulation

> Representational simulation of IoT devices.


## About

This project creates simulated IoT devices and facilities. Realistic data is generated based on the type of device and time of day. IoT telemetry data is sent to the Azure IoT hub via MQTT. 

## Devices

* Energy Device
* Tank Device 
* Wind Device

### Device & Facility API 

```javascript
// Tank Monitoring Device
var tank_iot_01 = new TankDevice(
  dsn = "tank_iot_01",
  type = "tank",
  connectionString = config.connection_strings.device.tank_iot_01,
  profile = null,
  print = false);

// Wind Monitoring Device
var wind_iot_01 = new WindDevice(
  dsn = "wind_iot_01",
  type = "wind",
  connectionString = config.connection_strings.device.wind_iot_01,
  profile = "profile1",
  print = false);

// Energy Monitoring Device
var energy_iot_01 = new EnergyDevice(
  dsn = "energy_iot_01",
  type = "energy",
  connectionString = config.connection_strings.device.energy_iot_01,
  profile = "profile1",
  print = false);

var facility_01 = new Facility(
  name = "facility_01",
  devices = [energy_iot_01, wind_iot_01, tank_iot_01],
  geolocation = { "lat": 51.0447, "lon": 114.0719 },
  frequency = 10000);
  
facility_01.setupFacility();
facility_01.putOnline();



```

## Built With

* [Node.js](https://nodejs.org/en/) - JavaScript runtime
* [Azure IoT Hub](https://azure.microsoft.com/en-ca/services/iot-hub/) - bi-directional communication between IoT devices and Azure
* [Docker](https://www.docker.com/) - Container platform


## Author

* **Andrew Moss** - *Creator* - [agmoss](https://github.com/agmoss)