const EnergyDevice = require('./Models/EnergyDevice');
const WindDevice = require('./Models/WindDevice');
const TankDevice = require('./Models/TankDevice');
const Facility = require('./Models/Facility');

var config = require("./config");

//Facility 1

// Tank Monitoring Device
var tank_iot_01 = new TankDevice(
  dsn = "tank_iot_01",
  type = "tank",
  connectionString = config.connection_strings.device.tank_iot_01);

// Wind Monitoring Device
var wind_iot_01 = new WindDevice(
  dsn = "wind_iot_01",
  type = "wind",
  connectionString = config.connection_strings.device.wind_iot_01);

// Energy Monitoring Device
var energy_iot_01 = new EnergyDevice(
  dsn = "energy_iot_01",
  type = "energy",
  connectionString = config.connection_strings.device.energy_iot_01);

//Facility 2

// Tank Monitoring Device
var tank_iot_02 = new TankDevice(
    dsn = "tank_iot_02",
    type = "tank",
    connectionString = config.connection_strings.device.tank_iot_02);
  
// Wind Monitoring Device
var wind_iot_02 = new WindDevice(
    dsn = "wind_iot_02",
    type = "wind",
    connectionString = config.connection_strings.device.wind_iot_02);

// Energy Monitoring Device
var energy_iot_02 = new EnergyDevice(
    dsn = "energy_iot_02",
    type = "energy",
    connectionString = config.connection_strings.device.energy_iot_02);


var facility_01 = new Facility(name = "facility_01", devices =  [energy_iot_01,wind_iot_01,tank_iot_01],geolocation = {"lat":51.0447,"lon":114.0719});
facility_01.setupFacility();
facility_01.putOnline();


var facility_02 = new Facility(name = "facility_02", devices =  [energy_iot_02,wind_iot_02,tank_iot_02],geolocation = {"lat":53.5461,"lon":113.4938});
facility_02.setupFacility();
facility_02.putOnline();
