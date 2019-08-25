const Device = require('./Device');

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
    constructor(dsn,geolocation,type,connectionString){
        super(dsn,geolocation,type,connectionString);
    }

    createDeviceTelemetry(){
        var timeStamp = new Date();

        var breakDown = [
            {
                "mean":100,
                "sd" : 10
            },
            {
                "mean":400,
                "sd":30    
            },
            {
                "mean":200,
                "sd":15
            },
            {
                "mean":100,
                "sd":10
            }

        ]

        var watts = super.continuousReading(timeStamp,breakDown)();

        return this.setTelemetry({"watts":watts,"timestamp":timeStamp})
    }

}

module.exports = EnergyDevice;