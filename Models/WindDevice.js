const Device = require('./Device');
const profile = require('../Profiles/wind');

/**
 * WindDevice class.
 *
 * @constructor
 * @param {String} dsn - device serial number.
 * @param {String} geolocation  - location of the IoT device.
 * @param {String} type  - type of device.
 * @param {String} connectionString  - connection paramater for Azure IoT hub.
 */

class WindDevice extends Device{
    constructor(dsn,geolocation,type,connectionString,profile,print){
        super(dsn,geolocation,type,connectionString,profile,print)
    }

    createDeviceTelemetry(){
        
        var timeStamp = new Date();

        // Set up data profile
        var directionProfile = [
            {
                "values":['N','S','E','W'],
                "weights" : [1,2,1,1]
            }
        ]


        var mphProfile = null;

        // Select profile
        if (super.getProfile()=== "profile1"){
            mphProfile = profile.profile1;
        }
        else if (super.getProfile()=== "profile2"){
            mphProfile = profile.profile2;
        }
        
        // Create readings
        var direction = super.discreteReading(directionProfile);
        var mph = super.continuousReading(timeStamp,mphProfile)();

        return this.setTelemetry({"mph":mph.toFixed(3),"direction":direction,"timestamp":timeStamp})
    }
}

module.exports = WindDevice;