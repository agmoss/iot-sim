const Device = require('./Device');

const profile = require('../Profiles/energy');

/**
 * EnergyDevice class.
 *
 * @constructor
 * @param {String} dsn - device serial number.
 * @param {String} geolocation  - location of the IoT device.
 * @param {String} type  - type of device.
 * @param {String} connectionString  - connection paramater for Azure IoT hub.
 */

class EnergyDevice extends Device {
    constructor(dsn,type,connectionString,profile,print){
        super(dsn,type,connectionString,profile,print);
    }

    createDeviceTelemetry(){
        
        var timeStamp = new Date();

        var wattageProfile = null;

        // Select profile
        if (super.getProfile()=== "profile1"){
            wattageProfile = profile.profile1;
        }
        else if (super.getProfile()=== "profile2"){
            wattageProfile = profile.profile2;
        }

        // Create reading
        var watts = super.continuousReading(timeStamp,wattageProfile)();

        return this.setTelemetry({"watts":watts.toFixed(3),"timestamp":timeStamp})
    }

}

module.exports = EnergyDevice;