const Device = require('./Device');

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
    constructor(dsn,geolocation,type,connectionString){
        super(dsn,geolocation,type,connectionString)
    }

    createDeviceTelemetry(){
        
        var timeStamp = new Date();

        var breakDown = [
            {
                "mean":100,
                "sd" : 5
            },
            {
                "mean":100,
                "sd":5    
            },
            {
                "mean":25,
                "sd":1
            },
            {
                "mean":75,
                "sd":1
            }

        ]

        var liters = super.continuousReading(timeStamp,breakDown)();

        return this.setTelemetry({"liters":liters,"timestamp":timeStamp});
    }
}

module.exports = TankDevice;