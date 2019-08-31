const Device = require('./Device');

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
    constructor(dsn,geolocation,type,connectionString){
        super(dsn,geolocation,type,connectionString)
    }

    createDeviceTelemetry(){
        
        var timeStamp = new Date();

        var weighting = [
            {
                "values":['N','S','E','W'],
                "weights" : [1,2,1,1]
            },
            {
                "values":['N','S','E','W'],
                "weights" : [1,2,1,1]
            },
            {
                "values":['N','S','E','W'],
                "weights" : [1,2,1,1]
            },
            {
                "values":['N','S','E','W'],
                "weights" : [1,2,1,1]
            }
        ]

        var breakDown = [
            {
                "mean":10,
                "sd" : 3
            },
            {
                "mean":40,
                "sd":5.1    
            },
            {
                "mean":20,
                "sd":1.3
            },
            {
                "mean":10,
                "sd":1.1
            }
        ]

        var direction = super.discreteReading(timeStamp,weighting);
        var mph = super.continuousReading(timeStamp,breakDown)();

        return this.setTelemetry({"mph":mph.toFixed(3),"direction":direction,"timestamp":timeStamp})
    }
}

module.exports = WindDevice;