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

        var litersBreakDown = [
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
        ];

        var phBreakdown = [
            {
                "mean":10,
                "sd" : 0.4
            },
            {
                "mean":9,
                "sd":0.25    
            },
            {
                "mean":6,
                "sd":0.25
            },
            {
                "mean":7,
                "sd":0.1
            }
        ];

        var liters = super.continuousReading(timeStamp,litersBreakDown)();
        var pH = super.continuousReading(timeStamp,phBreakdown)();

        return this.setTelemetry({"liters":liters.toFixed(3),"pH":pH.toFixed(3),"timestamp":timeStamp});
    }
}

module.exports = TankDevice;