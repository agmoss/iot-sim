var Mqtt = require('azure-iot-device-mqtt').Mqtt;
var DeviceClient = require('azure-iot-device').Client;
var Message = require('azure-iot-device').Message;

const EnergyDevice = require('./Models/EnergyDevice');
const WindDevice = require('./Models/WindDevice');
const TankDevice = require('./Models/TankDevice');

var config = require("./config");

var tankConnectionString = config.connection_strings.device.tank_iot_01;
var windConnectionString = config.connection_strings.device.wind_iot_01;
var energyConnectionString = config.connection_strings.device.energy_iot_01;

var tankClient = DeviceClient.fromConnectionString(tankConnectionString, Mqtt);
var windClient = DeviceClient.fromConnectionString(windConnectionString, Mqtt);
var energyClient = DeviceClient.fromConnectionString(energyConnectionString, Mqtt);

// Tank Monitoring Device
var tank_iot_01 = new TankDevice(
  dsn = "tank_iot_01",
  geolocation = {"lat":51.0447,"lon":114.0719},
  type = "tank");

// Wind Monitoring Device
var wind_iot_01 = new WindDevice(
  dsn = "wind_iot_01",
  geolocation = {"lat":51.0447,"lon":114.0719},
  type = "wind");

// Energy Monitoring Device
var energy_iot_01 = new EnergyDevice(
  dsn = "energy_iot_01",
  geolocation = {"lat":51.0447,"lon":114.0719},
  type = "energy");


function start(counter){
  if(counter < 10){
    setTimeout(function(){

      counter++;
      console.log(counter);

      // Tank IoT Message
      var tankMessage = new Message(JSON.stringify(tank_iot_01.createReading()));
      console.log('Sending tank message: ' + tankMessage.getData());

      // Send the message.
      tankClient.sendEvent(tankMessage,(err) => {
        if (err) {
          console.error('send error: ' + err.toString());
        } else {
          console.log('message sent');
        }
      });

      // Wind IoT Message
      var windMessage = new Message(JSON.stringify(wind_iot_01.createReading()));
      console.log('Sending wind message: ' + windMessage.getData());

      // Send the message.
      windClient.sendEvent(windMessage,(err) => {
        if (err) {
          console.error('send error: ' + err.toString());
        } else {
          console.log('message sent');
        }
      });

      // Energy IoT Message
      var energyMessage = new Message(JSON.stringify(energy_iot_01.createReading()));
      console.log('Sending energy message: ' + energyMessage.getData());

      // Send the message.
      energyClient.sendEvent(energyMessage,(err) => {
        if (err) {
          console.error('send error: ' + err.toString());
        } else {
          console.log('message sent');
        }
      });

      start(counter);

    }, 1000);
  }
}


start(0);
