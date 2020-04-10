import {
    TankDevice,
    WindDevice,
    EnergyDevice,
    Facility
} from "../index"

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