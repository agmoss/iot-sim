const Device = require('./Device');

class TankDevice extends Device{
    constructor(dsn,geolocation,type){
        super(dsn,geolocation,type)
    }

    createReading(){
        
        var timeStamp = new Date();

        console.log(timeStamp);

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
                "sd":15
            },
            {
                "mean":75,
                "sd":10
            }

        ]

        var liters = super.continuousReading(timeStamp,breakDown)();

        return {"liters":liters}
    }
}

module.exports = TankDevice;