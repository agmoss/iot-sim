const Device = require('./Device');
const profile = require('../Profiles/tank');

/**
 * TankDevice class.
 *
 * @constructor
 * @param {String} dsn - device serial number.
 * @param {String} geolocation  - location of the IoT device.
 * @param {String} type  - type of device.
 * @param {String} connectionString  - connection paramater for Azure IoT hub.
 */

class TankDevice extends Device{
    constructor(dsn,geolocation,type,connectionString,profile,print){
        super(dsn,geolocation,type,connectionString,profile,print)
    }

    createDeviceTelemetry(){
        
        var timeStamp = new Date();

        // Setup profiles
        var litersProfile = profile.litersProfile;
        var phProfile = profile.phProfile;

        // Create messages
        var liters = super.continuousReading(timeStamp,litersProfile)();
        var pH = super.continuousReading(timeStamp,phProfile)();

        return this.setTelemetry({"liters":liters.toFixed(3),"pH":pH.toFixed(3),"timestamp":timeStamp});
    }
}

module.exports = TankDevice;